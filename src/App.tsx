/* Imports */
import React, { type JSX } from "react";
import { BrowserRouter as Router } from "react-router-dom";

/* Relative Imports */
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";

/* Local Imports */
import { ThemeContextProvider } from "@/context/ThemeContext";
import Routing from "@/routes";
import { SessionProvider } from "@/context/SessionContext";
import ThemeModeSetting from "@/components/ThemeModeSetting";
import { queryClient } from "@/config/queryClientConfig";
import { Toaster } from "@/components/ui/sonner";

// ----------------------------------------------------------------------

/**
 * App component to to set all the higher level components and routes.
 *
 * @component
 * @returns {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
  return (
    <HelmetProvider>
      <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SessionProvider>
          <ThemeModeSetting />
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routing />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeContextProvider>
    </HelmetProvider>
  );
};

export default App;
