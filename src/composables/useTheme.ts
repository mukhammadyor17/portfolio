import { ref } from "vue";
import {
  themes,
  isThemeName,
  defaultTheme,
  type ThemeName,
} from "../data/themes";

const STORAGE_KEY = "terminal-theme";

function readStoredTheme(): ThemeName {
  if (typeof localStorage === "undefined") return defaultTheme;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && isThemeName(stored) ? stored : defaultTheme;
}

function applyThemeVars(name: ThemeName) {
  if (typeof document === "undefined") return;
  const t = themes[name];
  const root = document.documentElement.style;
  root.setProperty("--term-bg", t.bg);
  root.setProperty("--term-green", t.green);
  root.setProperty("--term-amber", t.amber);
  root.setProperty("--term-text", t.text);
  root.setProperty("--term-dim", t.dim);
}

const currentTheme = ref<ThemeName>(readStoredTheme());
applyThemeVars(currentTheme.value);

function applyTheme(name: ThemeName) {
  applyThemeVars(name);
  currentTheme.value = name;
  localStorage.setItem(STORAGE_KEY, name);
}

export function useTheme() {
  return { currentTheme, applyTheme };
}
