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
