# Design Guidelines: Literature Character Chatbot Platform

## Design Approach

**Hybrid Approach: Educational Utility + Literary Sophistication**

Drawing inspiration from:
- **Linear/Notion**: Clean, readable interface with excellent typography
- **Discord**: Proven chat patterns with clear message bubbles and user-friendly interactions
- **Duolingo**: Approachable educational design that makes learning engaging
- **Literary aesthetics**: Book-themed visual language with warm, sophisticated color palette

**Core Principles:**
- Readable first: Optimize for extended reading sessions
- Approachable learning: Reduce intimidation factor while maintaining literary sophistication
- Clear hierarchy: Students should instantly understand where to select characters and how to chat
- Distraction-free: Minimal animations, focus on content and conversation

## Color Palette

**Light Mode (Primary):**
- Background: 40 8% 98% (warm off-white, book page feel)
- Surface: 35 15% 95% (subtle cream for cards)
- Primary (literary burgundy): 355 65% 45%
- Secondary (deep navy): 220 40% 25%
- Text primary: 220 20% 15%
- Text secondary: 220 15% 45%
- Accent (warm gold): 40 70% 55%
- Border: 35 10% 85%

**Dark Mode:**
- Background: 220 20% 12% (deep charcoal)
- Surface: 220 18% 16%
- Primary: 355 60% 55%
- Secondary: 220 45% 65%
- Text primary: 40 10% 95%
- Text secondary: 220 10% 70%
- Border: 220 15% 25%

## Typography

**Fonts (Google Fonts via CDN):**
- Headlines: 'Playfair Display', serif (literary elegance)
- Body/Interface: 'Inter', sans-serif (modern readability)
- Chat messages: 'Inter', sans-serif

**Scale:**
- Hero/Page titles: text-5xl font-bold (Playfair Display)
- Section headers: text-3xl font-semibold (Playfair Display)
- Character names: text-xl font-semibold (Playfair Display)
- Body text: text-base (Inter)
- Chat messages: text-sm to text-base (Inter)
- Metadata/captions: text-xs to text-sm text-secondary

## Layout System

**Spacing Primitives:**
Primary units: 2, 3, 4, 6, 8, 12, 16, 20, 24
Common patterns: p-6, gap-4, space-y-8, mb-12

**Grid System:**
- Container: max-w-7xl mx-auto px-4 to px-8
- Character grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Chat layout: Two-column on desktop (lg:grid-cols-[320px_1fr]) with character sidebar
- Mobile: Single column stack

**Section Spacing:**
- Vertical padding: py-12 md:py-16 lg:py-20
- Between sections: space-y-12 to space-y-16

## Component Library

### Navigation
- Fixed header with logo (book icon + "LitChat")
- Navigation links: Home, Characters, About, How It Works
- Clean horizontal nav with subtle underline on active state
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- Two-column layout: Left (60%) text content, Right (40%) decorative illustration
- Headline: Large Playfair Display introducing the platform
- Subheading: Concise value proposition for students
- Primary CTA: "Start Chatting" button (primary burgundy)
- Background: Subtle book texture or library-themed image (soft, not distracting)

### Character Cards
- Elevated card design with subtle shadow
- Character portrait (circular or rounded square avatar)
- Character name (Playfair Display, text-xl)
- Book title and author (text-sm, secondary color)
- Brief character tagline (1 sentence, italic text-sm)
- "Chat Now" button (primary, full-width)
- Hover state: Slight lift (shadow increase), no complex animations

### Chat Interface

**Left Sidebar (Desktop):**
- Character list with avatars
- Active character highlighted
- Easy switching between conversations
- "New Character" button at top

**Main Chat Area:**
- Character header: Avatar, name, book title, "New Chat" button
- Message bubbles:
  - User messages: Right-aligned, primary color background, white text
  - Character messages: Left-aligned, surface color, primary text
  - Avatar next to character messages
  - Timestamp (subtle, text-xs)
- Input area: Fixed bottom, textarea with "Send" button
- Chat history scrollable with smooth scroll behavior

**Mobile:**
- Full-screen chat
- Back button to character selection
- Bottom sheet for character switching

### Character Information Panel
- Expandable sidebar or modal
- Character portrait (larger)
- Full bio section
- Related books and themes
- "About this character" educational context

### Forms & Inputs
- Text inputs: Bordered with focus ring (primary color)
- Textarea for chat: Auto-resize, max height, rounded corners
- Buttons:
  - Primary: Solid burgundy, white text, rounded-lg
  - Secondary: Outline with primary border
  - Disabled state: Reduced opacity

### Loading States
- Skeleton loaders for character cards
- Typing indicator (three dots) for character responses
- Smooth transitions, no jarring loading spinners

## Images

**Hero Section:**
- Large atmospheric image or illustration depicting a library, bookshelf, or literary scene
- Warm, inviting tones with soft lighting
- Can be subtle background or prominent right-column feature
- Should not overwhelm text readability

**Character Avatars:**
- Circular portraits of literature characters
- Consistent style across all characters (illustrated or classic portrait style)
- 80x80px in cards, 120x120px in chat header
- Fallback: Initial letter in colored circle if no image available

**Decorative Elements:**
- Subtle book spine pattern as background texture
- Quill or typewriter icons for empty states
- Open book illustrations for "How It Works" section

## Special Considerations

**Educational Focus:**
- Clear visual hierarchy to guide students
- Ample whitespace prevents overwhelming interface
- Accessible color contrast ratios (WCAG AA minimum)
- Large touch targets for mobile (min 44x44px)

**Chat Experience:**
- Generous padding in message bubbles for readability
- Clear visual distinction between user and character messages
- Chat history preserved and easily scrollable
- Character personality visible through consistent avatar and formatting

**Performance:**
- Lazy load character images
- Virtualized chat history for long conversations
- Minimal animation budget (only subtle transitions)