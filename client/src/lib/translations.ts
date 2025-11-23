export const translations = {
  en: {
    // Header
    appName: "LitChat",
    
    // Hero Section
    heroTitle: "Chat with Literature's Greatest Characters",
    heroDescription: "An educational platform where students can have authentic conversations with famous literature characters, powered by AI. Explore themes, discuss motivations, and deepen your understanding of classic works.",
    startChatting: "Start Chatting",
    learnMore: "Learn More",
    
    // Features Section
    authenticVoices: "Authentic Voices",
    authenticVoicesDesc: "Characters respond in their unique voice, maintaining the personality and speech patterns from their stories.",
    multipleCharacters: "Multiple Characters",
    multipleCharactersDesc: "Chat with characters from different eras and genres, from Pushkin to modern classics.",
    deepLearning: "Deep Learning",
    deepLearningDesc: "Explore themes, motivations, and historical context through interactive conversations.",
    
    // Characters Section
    meetTheCharacters: "Meet the Characters",
    charactersDescription: "Choose a character to start your conversation. Each one is ready to discuss their story, answer your questions, and help you understand their world.",
    chatNow: "Chat Now",
    by: "by",
    
    // How It Works Section
    howItWorks: "How It Works",
    howItWorksDescription: "Start meaningful conversations in three simple steps",
    step1Title: "Choose a Character",
    step1Description: "Browse our collection of famous literature characters and select one that interests you or relates to your current studies.",
    step2Title: "Start the Conversation",
    step2Description: "Ask questions, discuss themes, or explore the character's motivations. They'll respond in their authentic voice.",
    step3Title: "Deepen Your Understanding",
    step3Description: "Use the insights from your conversations to enhance your essays, prepare for discussions, or simply enjoy literature in a new way.",
  
    // Chat Page
    typeMessage: "Type your message...",
    send: "Send",
    newChat: "New Chat",
    backToCharacters: "Back to Characters",
  },
  ru: {
    // Header
    appName: "ЛитЧат",
    
    // Hero Section
    heroTitle: "Общайтесь с величайшими литературными персонажами",
    heroDescription: "Образовательная платформа, где студенты могут вести подлинные беседы с известными литературными персонажами при помощи ИИ. Исследуйте темы, обсуждайте мотивы и углубляйте понимание классических произведений.",
    startChatting: "Начать общение",
    learnMore: "Узнать больше",
    
    // Features Section
    authenticVoices: "Аутентичные голоса",
    authenticVoicesDesc: "Персонажи отвечают своим уникальным голосом, сохраняя личность и речевые паттерны из своих историй.",
    multipleCharacters: "Множество персонажей",
    multipleCharactersDesc: "Общайтесь с персонажами из разных эпох и жанров, от Пушкина до современной классики.",
    deepLearning: "Глубокое обучение",
    deepLearningDesc: "Исследуйте темы, мотивы и исторический контекст через интерактивные беседы.",
    
    // Characters Section
    meetTheCharacters: "Познакомьтесь с персонажами",
    charactersDescription: "Выберите персонажа, чтобы начать беседу. Каждый готов обсудить свою историю, ответить на ваши вопросы и помочь вам понять их мир.",
    chatNow: "Начать чат",
    by: "автор:",
    
    // How It Works Section
    howItWorks: "Как это работает",
    howItWorksDescription: "Начните содержательные беседы в три простых шага",
    step1Title: "Выберите персонажа",
    step1Description: "Просмотрите нашу коллекцию известных литературных персонажей и выберите того, кто вас интересует или связан с вашими текущими занятиями.",
    step2Title: "Начните беседу",
    step2Description: "Задавайте вопросы, обсуждайте темы или исследуйте мотивы персонажа. Они ответят своим подлинным голосом.",
    step3Title: "Углубите понимание",
    step3Description: "Используйте идеи из ваших бесед для улучшения эссе, подготовки к обсуждениям или просто наслаждайтесь литературой по-новому.",
    
   
    // Chat Page
    typeMessage: "Введите сообщение...",
    send: "Отправить",
    newChat: "Новый чат",
    backToCharacters: "Вернуться к персонажам",
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
