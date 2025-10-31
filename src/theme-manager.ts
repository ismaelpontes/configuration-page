type ThemeMode = "light" | "dark";
const THEME_KEY = "site:theme";
let currentMode: ThemeMode = "light";

export const getSavedTheme = (): ThemeMode | null => {
  const v = localStorage.getItem(THEME_KEY);
  return v === "dark" || v === "light" ? v : null;
};

export const detectPreferredTheme = (): ThemeMode => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return "dark";
  return "light";
};

export const applyTheme = async (mode: ThemeMode) => {
  currentMode = mode;
  const el = document.documentElement;
  if (mode === "dark") el.classList.add("my-app-dark");
  else el.classList.remove("my-app-dark");

  localStorage.setItem(THEME_KEY, mode);
};

export const initTheme = async () => {
  const saved = getSavedTheme();
  const initial = saved ?? detectPreferredTheme();
  await applyTheme(initial);
};

export const toggleTheme = async () => {
  const next: ThemeMode = currentMode === "dark" ? "light" : "dark";
  await applyTheme(next);
};
