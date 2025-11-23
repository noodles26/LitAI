import express, { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { characters } from "@shared/characters";

export async function registerRoutes(app: Express): Promise<Server> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  function detectLanguage(text: string): "ru" | "en" {
    const cyr = /[а-яёА-ЯЁ]/;
    return cyr.test(text) ? "ru" : "en";
  }

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, character, lang: clientLang } = req.body;

      console.log("[/api/chat] incoming:", { character, message, clientLang });

      const selectedCharacter = characters.find(
        (c) =>
          c.id === character ||
          c.translations.en.name === character ||
          c.translations.ru.name === character
      );

      if (!selectedCharacter) {
        return res.status(400).json({ error: "Character not found" });
      }

      const detected = detectLanguage(message || "");
      const lang =
        clientLang === "ru" || clientLang === "en"
          ? clientLang
          : detected;

      const translation = selectedCharacter.translations[lang];

      const systemPrompt =
        translation.systemPrompt ||
        selectedCharacter.translations.en.systemPrompt ||
        selectedCharacter.translations.ru.systemPrompt ||
        "You are a helpful literary character.";

      const instruction =
        lang === "ru"
          ? "Отвечай строго на русском, в стиле персонажа."
          : "Reply strictly in English, in the character's voice.";

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent({
        systemInstruction: { parts: [{ text: `${systemPrompt}\n\n${instruction}` }] },
        contents: [{ role: "user", parts: [{ text: message }] }]
      });

      const botResponse =
        result.response.text() ||
        result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
        "";

      return res.json({ reply: botResponse });
    } catch (err) {
      console.error("[/api/chat] error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return createServer(app);
}

