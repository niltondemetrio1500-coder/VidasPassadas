import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";

export default function App() {
  const isPrivacy = window.location.pathname === "/politica-de-privacidade";
  return <ErrorBoundary><TooltipProvider><Toaster />{isPrivacy ? <Privacy /> : <Home />}</TooltipProvider></ErrorBoundary>;
}
