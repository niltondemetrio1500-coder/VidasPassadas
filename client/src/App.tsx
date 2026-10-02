import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  const path = window.location.pathname;
  const isPrivacy = path === "/politica-de-privacidade";
  const isTerms = path === "/termos-de-uso";
  return <ErrorBoundary><TooltipProvider><Toaster />{isPrivacy ? <Privacy /> : isTerms ? <Terms /> : <Home />}</TooltipProvider></ErrorBoundary>;
}
