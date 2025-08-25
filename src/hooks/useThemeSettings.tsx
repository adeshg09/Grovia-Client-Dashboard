/* Imports */
import { useContext } from "react";
import ThemeContextProvider from "@/context/ThemeContext";

/* Relative Imports */

// ----------------------------------------------------------------------

/**
 * Hook to get/set the theme mode
 * @component
 * @yields {function}
 */
const useThemeSettings = () => {
  /* Hooks */
  const { theme: themeMode, setTheme } = useContext(ThemeContextProvider);

  /**
   * function to change the theme mode
   *
   * @returns {void}
   */
  // const handleChangeTheme = useCallback(() => {
  //   switchMode(themeMode === "dark" ? "light" : "dark");
  // }, [switchMode, themeMode]);

  /* Output */
  return {
    themeMode,
    setTheme,
    // handleChangeTheme,
  };
};

export default useThemeSettings;
