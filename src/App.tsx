/* Imports */
import React, { type JSX } from "react";
import { BrowserRouter as Router } from "react-router-dom";

/* Relative Imports */
import { HelmetProvider } from "react-helmet-async";

/* Local Imports */
import { ThemeProvider } from "./context/ThemeContext";
import Routing from "./routes";
import { SessionProvider } from "./context/SessionContext";

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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SessionProvider>
          <Router>
            <Routing />
          </Router>
        </SessionProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
