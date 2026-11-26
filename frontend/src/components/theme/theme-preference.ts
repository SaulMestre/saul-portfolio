export const themeStorageKey = "portfolio.theme";
export const themeModes = ["system", "light", "dark"] as const;
export type ThemeMode = (typeof themeModes)[number];

const changeEvent = "portfolio:theme-change";

export function normalizeThemeMode(value: string | null): ThemeMode {
  return value === "light" || value === "dark" ? value : "system";
}

export function getThemeMode(): ThemeMode {
  return normalizeThemeMode(document.documentElement.getAttribute("data-theme"));
}

export function getServerThemeMode(): ThemeMode {
  return "system";
}

export function subscribeToTheme(listener: () => void): () => void {
  window.addEventListener(changeEvent, listener);
  return () => window.removeEventListener(changeEvent, listener);
}

export function setThemeMode(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.dataset.theme = mode;
  }

  try {
    localStorage.setItem(themeStorageKey, mode);
  } catch {
    // The current document still honors the selected mode.
  }
  window.dispatchEvent(new Event(changeEvent));
}
