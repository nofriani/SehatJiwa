import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Videos from "@/pages/Videos";
import VideoDetail from "@/pages/VideoDetail";
import Resources from "@/pages/Resources";
import Test from "@/pages/Test";
import NotFound from "@/pages/not-found";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route path="/videos" component={Videos} />
          <Route path="/videos/:id" component={VideoDetail} />
          <Route path="/resources" component={Resources} />
          <Route path="/test" component={Test} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
