import { useEffect } from "react";

const SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";

export default function UnicornEmbed({
  projectId = "MZNZ3utZ7eUYmFgSShpk",
  className = "",
  style = {},
}) {
  useEffect(() => {
    const init = () => {
      try {
        if (window.UnicornStudio?.init) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      } catch (e) {
        console.error("Unicorn init failed:", e);
      }
    };

    // If script already exists, just init
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      init();
      return;
    }

    // Match Unicorn’s embed logic (safe for React)
    if (!window.UnicornStudio) window.UnicornStudio = { isInitialized: false };

    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = init;

    (document.head || document.body).appendChild(s);
  }, []);

  return (
    <div
      data-us-project={projectId}
      className={className}
      style={style}
    />
  );
}
