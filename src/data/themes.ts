export interface TerminalTheme {
  bg: string;
  green: string;
  amber: string;
  text: string;
  dim: string;
}

export const themes = {
  classic: {
    bg: "#101413",
    green: "#4ADE80",
    amber: "#FBBF24",
    text: "#D7DDDA",
    dim: "#8B9490",
  },
  dracula: {
    bg: "#282A36",
    green: "#50FA7B",
    amber: "#F1FA8C",
    text: "#F8F8F2",
    dim: "#6272A4",
  },
  catppuccin: {
    bg: "#1E1E2E",
    green: "#A6E3A1",
    amber: "#F9E2AF",
    text: "#CDD6F4",
    dim: "#7F849C",
  },
  github: {
    bg: "#0D1117",
    green: "#3FB950",
    amber: "#D29922",
    text: "#C9D1D9",
    dim: "#8B949E",
  },
  gruvbox: {
    bg: "#282828",
    green: "#B8BB26",
    amber: "#FABD2F",
    text: "#EBDBB2",
    dim: "#928374",
  },
  everforest: {
    bg: "#2D353B",
    green: "#A7C080",
    amber: "#DBBC7F",
    text: "#D3C6AA",
    dim: "#859289",
  },
} as const satisfies Record<string, TerminalTheme>;

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as ThemeName[];

export const defaultTheme: ThemeName = "classic";

export function isThemeName(value: string): value is ThemeName {
  return Object.prototype.hasOwnProperty.call(themes, value);
}
