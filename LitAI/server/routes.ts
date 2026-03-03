import express, { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { characters } from "@shared/characters";

export async function registerRoutes(app: Express): Promise<Server> {

  function detectLanguage(text: string): "ru" | "en" {
    const cyr = /[а-яёА-ЯЁ]/;
    return cyr.test(text) ? "ru" : "en";
  }

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, character, lang: clientLang } = req.body;

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

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": Bearer ${process.env.KEY1}
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: ${systemPrompt}\n\n${instruction}
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("DeepSeek error:", data);
        return res.status(500).json({ error: "DeepSeek API error" });
      }

      const botResponse = data.choices?.[0]?.message?.content || "";

      return res.json({ reply: botResponse });

    } catch (err) {
      console.error("[/api/chat] error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return createServer(app);
}
