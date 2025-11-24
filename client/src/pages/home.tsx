import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/CharacterCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, MessageCircle, Users, Sparkles } from "lucide-react";
import { characters } from "@shared/characters";
import type { Character } from "@shared/characters";
import { useLocation } from "wouter";
import libraryImg from "@assets/stock_images/IMG_4558.jpeg";
import { useEffect} from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

export function SafetyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("safety_shown");
    if (!seen) {
      setOpen(true);
      localStorage.setItem("safety_shown", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Важные рекомендации</DialogTitle>
          <DialogDescription>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>Не делитесь личной информацией (номер, адрес, пароли и т. д.).</li>
              <li>Ответы персонажей могут содержать ошибки.</li>
              <li>Не воспринимайте ответы как профессиональный или учебный совет.</li>
              <li>Ассистент отвечает только на языке интерфейса сайта..</li>
              <li>Если что-то работает неправильно — постарайтесь перезагрузить страницу.</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => setOpen(false)}>Понятно</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleSelectCharacter = (character: Character) => {
    setLocation(`/chat/${character.id}`);
  };



  return (
    <div className="min-h-screen">
      <SafetyModal />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="font-serif text-xl font-bold">{t("appName")}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${libraryImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              data-testid="text-hero-title"
            >
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("heroDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("characters")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-testid="button-start-chatting"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("startChatting")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-testid="button-learn-more"
              >
                {t("learnMore")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold">
                {t("authenticVoices")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("authenticVoicesDesc")}
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-2">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold">
                {t("multipleCharacters")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("multipleCharactersDesc")}
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-2">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold">
                {t("deepLearning")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("deepLearningDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              data-testid="text-section-title"
            >
              {t("meetTheCharacters")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("charactersDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={handleSelectCharacter}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {t("howItWorks")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("howItWorksDescription")}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {t("step1Title")}
                </h3>
                <p className="text-muted-foreground">{t("step1Description")}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {t("step2Title")}
                </h3>
                <p className="text-muted-foreground">{t("step2Description")}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {t("step3Title")}
                </h3>
                <p className="text-muted-foreground">{t("step3Description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
