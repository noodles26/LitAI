import express, { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { characters } from "@shared/characters";

const API_KEYS = [
  process.env.KEY1,
  process.env.KEY2,
  process.env.KEY3,
  process.env.KEY4,
  process.env.KEY5,
].filter(Boolean); 

let currentKeyIndex = 0;

function getClient() {
  return new GoogleGenerativeAI(API_KEYS[currentKeyIndex]);
}

async function generateWithRetry(payload: any) {
  let attempts = 0;

  while (attempts < API_KEYS.length) {
    try {
      const genAI = getClient();
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const response = await model.generateContent(payload);
      return response;

    } catch (err: any) {
      const msg = err.message || "";

      if (msg.includes("429") || msg.includes("quota") || msg.includes("Too Many Requests")) {
        console.log(
          `⚠️ Ключ #${currentKeyIndex} закончился. Переключаю на следующий...`
        );
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        attempts++;
        continue;
      }

      throw err;
    }
  }

  throw new Error("Все API-ключи исчерпаны.");
}

function detectLanguage(text: string): "ru" | "en" {
  return /[а-яёА-ЯЁ]/.test(text) ? "ru" : "en";
}

export async function registerRoutes(app: Express): Promise<Server> {

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
        clientLang === "ru" || clientLang === "en" ? clientLang : detected;

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

      const result = await generateWithRetry({
        systemInstruction: { parts: [{ text: `${systemPrompt}\n\n${instruction}` }] },
        contents: [{ role: "user", parts: [{ text: message }] }],
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
