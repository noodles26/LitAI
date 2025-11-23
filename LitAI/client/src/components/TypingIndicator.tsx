export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4" data-testid="indicator-typing">
      <div className="flex items-center gap-1 bg-card rounded-lg px-4 py-3">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
      </div>
    </div>
  );
}
