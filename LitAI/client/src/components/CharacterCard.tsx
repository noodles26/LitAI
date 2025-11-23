import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Character } from "@shared/characters";

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
  isActive?: boolean;
}

export function CharacterCard({ character, onSelect, isActive }: CharacterCardProps) {
  const { language } = useLanguage();
  const t = character.translations[language];

  return (
    <Card
      className={`p-6 hover-elevate cursor-pointer transition-all ${
        isActive ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onSelect(character)}
      data-testid={`card-character-${character.id}`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        
        <Avatar className="h-20 w-20">
          <AvatarImage src={character.avatar} alt={t.name} />
          <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold">{t.name}</h3>
          <p className="text-sm text-muted-foreground">{t.book}</p>

          <p className="text-xs text-muted-foreground">
            {language === "ru" ? "Автор:" : "by"} {t.author}
          </p>
        </div>

        <p className="text-sm text-muted-foreground italic line-clamp-2">
          {t.description}
        </p>

        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(character);
          }}
          data-testid={`button-chat-${character.id}`}
        >
          {language === "ru" ? "Начать чат" : "Start Chat"}
        </Button>
      </div>
    </Card>
  );
}