import { ChatInput } from '../ChatInput';

export default function ChatInputExample() {
  return (
    <div className="p-6 max-w-3xl">
      <ChatInput 
        onSend={(msg) => console.log('Sending:', msg)}
        placeholder="Ask Hamlet a question..."
      />
    </div>
  );
}
