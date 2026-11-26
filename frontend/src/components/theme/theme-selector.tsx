"use client";

import { useId, useSyncExternalStore } from "react";
import { messages, type Locale } from "../../localization/messages";
import {
  getServerThemeMode,
  getThemeMode,
  normalizeThemeMode,
  setThemeMode,
  subscribeToTheme,
  themeModes,
} from "./theme-preference";

export function ThemeSelector({ locale }: { locale: Locale }) {
  const id = useId();
  const copy = messages[locale];
  const mode = useSyncExternalStore(subscribeToTheme, getThemeMode, getServerThemeMode);

  return (
    <div className="ui-theme-control">
      <label htmlFor={id}>{copy.themeLabel}</label>
      <select
        id={id}
        className="ui-select"
        value={mode}
        onChange={(event) => setThemeMode(normalizeThemeMode(event.target.value))}
      >
        {themeModes.map((option) => (
          <option key={option} value={option}>
            {copy.themeOptions[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
