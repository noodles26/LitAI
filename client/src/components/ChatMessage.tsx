import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  characterName?: string;
  characterAvatar?: string;
  timestamp?: string;
}

export function ChatMessage({ 
  content, 
  isUser, 
  characterName, 
  characterAvatar,
  timestamp 
}: ChatMessageProps) {

  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: Объясни ответ персонажа:\n"${content}"\n\nОбъясни:\n- мотивацию\n- связь с сюжетом\n- характер,
          character: characterName,
          lang: "ru",
        }),
      });

      const data = await res.json();
      setExplanation(data.reply || "Нет объяснения");
    } catch (e) {
      setExplanation("Ошибка при получении объяснения");
    }

    setLoading(false);
  };

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      data-testid={isUser ? "message-user" : "message-character"}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={characterAvatar} alt={characterName} />
          <AvatarFallback>{characterName?.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[80%] md:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {!isUser && characterName && (
          <span className="text-xs font-medium px-1">{characterName}</span>
        )}
        
        <div
          className={cn(
            "rounded-lg px-4 py-2.5",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {!isUser && (
          <button
            onClick={handleExplain}
            className="text-xs opacity-70 hover:opacity-100 transition px-1 mt-1"
          >
            {loading ? "..." : "📖 Объяснить"}
          </button>
        )}

        {explanation && (
          <div className="text-xs mt-2 p-2 rounded bg-muted">
            {explanation}
          </div>
        )}
  
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp}
          </span>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0 bg-muted">
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
