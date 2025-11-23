import { ChatMessage } from '../ChatMessage';
import { characters } from '@shared/characters';

export default function ChatMessageExample() {
  return (
    <div className="p-6 max-w-3xl space-y-4">
      <ChatMessage
        content="To be, or not to be, that is the question. What troubles thee, dear student?"
        isUser={false}
        characterName={characters[0].name}
        characterAvatar={characters[0].avatar}
        timestamp="2:30 PM"
      />
      <ChatMessage
        content="I'm studying your famous soliloquy for my English class. What were you really thinking about?"
        isUser={true}
        timestamp="2:31 PM"
      />
      <ChatMessage
        content="Ah, thou seekest the depths of my contemplation. 'Twas not merely about death, but the very nature of existence and suffering..."
        isUser={false}
        characterName={characters[0].name}
        characterAvatar={characters[0].avatar}
        timestamp="2:32 PM"
      />
    </div>
  );
}
