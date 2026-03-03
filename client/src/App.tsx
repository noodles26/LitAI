import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/home";
import Chat from "@/pages/chat";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat/:characterId" component={Chat} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
    <footer style={{
  textAlign: "center",
  padding: "20px",
  marginTop: "50px",
  borderTop: "1px solid #e0e0e0",
  fontSize: "14px",
  color: "#777"
}}>
  © 2026 Battuya Ochirbat | School Project
</footer>
  );
}

export default App;
