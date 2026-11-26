import { themeModes, themeStorageKey } from "./theme-preference";

const explicitModes = themeModes.filter((mode) => mode !== "system");

export const themeBootstrapSource = `(() => {
  const root = document.documentElement;
  let mode = null;
  try {
    mode = localStorage.getItem(${JSON.stringify(themeStorageKey)});
  } catch {}
  if (${JSON.stringify(explicitModes)}.includes(mode)) {
    root.setAttribute("data-theme", mode);
  } else {
    root.removeAttribute("data-theme");
  }
})();`;

export function ThemeBootstrap() {
  return <script dangerouslySetInnerHTML={{ __html: themeBootstrapSource }} />;
}
