import { useEffect, useState } from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export const applyTheme = (theme: Theme, setTheme: (theme: Theme) => void) => {
  const isDark = theme === Theme.Dark;
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", theme);
  setTheme(theme);
};

export const getPrefersColorSchemeMatchMedia = () => {
  return window.matchMedia("(prefers-color-scheme: dark)");
};

export const getSystemTheme = () => {
  return getPrefersColorSchemeMatchMedia().matches ? Theme.Dark : Theme.Light;
};

const useTheme = () => {
  /**
   * 实际的主题，包含 Theme.Auto
   */
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  /**
   * 当前主题
   */
  const [nowTheme, setNowTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    if (theme !== Theme.Auto) {
      setNowTheme(theme);
    } else {
      setNowTheme(getSystemTheme());
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const matchMedia = getPrefersColorSchemeMatchMedia();

    const applyThemeWrapper = (theme: Theme) => applyTheme(theme, setTheme);

    if (savedTheme && savedTheme !== Theme.Auto) {
      setTheme(savedTheme);
      applyThemeWrapper(savedTheme);
    } else {
      setTheme(Theme.Auto);
      applyThemeWrapper(getSystemTheme());
      const handleChange = (e: MediaQueryListEvent) =>
        applyThemeWrapper(e.matches ? Theme.Dark : Theme.Light);
      matchMedia.addEventListener("change", handleChange);
      return () => matchMedia.removeEventListener("change", handleChange);
    }
  }, []);

  return {
    theme: nowTheme,
    realTheme: theme,
    setTheme,
  };
};

export default useTheme;
