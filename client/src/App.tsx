import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
const Home = lazy(() => import("./pages/Home"));
const Application = lazy(() => import("./pages/Application"));
const Gallery = lazy(() => import("./pages/Gallery"));
const TheTable = lazy(() => import("./pages/TheTable"));
const CorporateHousing = lazy(() => import("./pages/CorporateHousing"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-ivory)]" />}>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/apply"} component={Application} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/the-table"} component={TheTable} />
      <Route path={"/corporate-housing"} component={CorporateHousing} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
