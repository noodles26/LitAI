import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, RotateCcw, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { characters } from "@shared/characters";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export default function Chat() {
  const [, params] = useRoute("/chat/:characterId");
  const [, setLocation] = useLocation();
  const characterId = params?.characterId;

  const character = characters.find((c) => c.id === characterId);
  const { language } = useLanguage(); // ← ЯЗЫК

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 🌐 Двуязычные приветствия
  const greetings: Record<string, { ru: string; en: string }> = {
    onegin: {
      ru: "Приветствую. Чем могу быть полезен?",
      en: "Greetings. How may I be of service?",
    },
    tatyana: {
      ru: "Здравствуйте… Что бы вы хотели обсудить?",
      en: "Hello… What would you like to discuss?",
    },
    pechorin: {
      ru: "Ну, рассказывай. Что тебе надо?",
      en: "Well, speak. What do you need?",
    },
    grinev: {
      ru: "Здравствуйте! Рад беседе. О чём поговорим?",
      en: "Hello! Glad to talk. What shall we discuss?",
    },
    liza: {
      ru: "Здравствуйте… О чём вы хотите поговорить?",
      en: "Hello… What would you like to talk about?",
    },
    natasha_rostova : {
      ru: "Ой, привет! Рассказывай, что у тебя случилось?",
      en: "Oh, hi! Go on, tell me what's going on?",
    },
    pierre_bezukhov : {
      ru: "Здравствуйте. Чем могу помочь вам сегодня?",
      en: "Hello. How can I help you today?",
    },
    andrei_bolkonsky : {
      ru: "Привет. Говорите прямо - что вам нужно?",
      en: "Hello. Speak plainly - what do you need?",
    },
    anna_karenina : {
      ru: "Здравствуйте. Я слушаю вас. О чём хотите поговорить?",
      en: "Hello. I'm listening. What would you like to talk about?",
    },
    raskolnikov : {
      ru: "Ну? Говори. Что тебе нужно сейчас?",
      en: "Well? Speak. What do you need right now",
    },
  };

  // Приветствие
  useEffect(() => {
    if (character && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        content: greetings[character.id]?.[language] || "Hello!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([greeting]);
    }
  }, [character, messages.length, language]);

  if (!character) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Character not found</h1>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // 🌐 отправляем lang + перевод имени
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: content,
        character: character.translations[language].name,
        lang: language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.reply || "Error: empty response.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, aiMessage]);
      })
      .catch((err) => {
        console.error(err);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: language === "ru"
              ? "Произошла ошибка при подключении к серверу."
              : "An error occurred while connecting to the server.",
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      });
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: greetings[character.id]?.[language] || "Hello!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const t = character.translations[language]; // удобнее

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Avatar className="h-10 w-10">
              <AvatarImage src={character.avatar} alt={t.name} />
              <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-lg font-semibold truncate">
                {t.name}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {t.book}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-serif">{t.name}</SheetTitle>
                  <SheetDescription>
                    {language === "ru" ? "Из произведения" : "From"} "{t.book}"{" "}
                    {language === "ru" ? "автора" : "by"} {t.author}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={character.avatar} alt={t.name} />
                      <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "ru" ? "О персонаже" : "About"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" onClick={handleNewChat}>
              <RotateCcw className="h-5 w-5" />
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              isUser={msg.isUser}
              characterName={t.name}
              characterAvatar={character.avatar}
              timestamp={msg.timestamp}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background/95 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder={
              language === "ru"
                ? `Спросите ${t.name}...`
                : `Ask ${t.name} a question...`
            }
          />
        </div>
      </div>
    </div>
  );
}



