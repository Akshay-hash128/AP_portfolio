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
      if (window.UnicornStudio?.init) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    const onResize = () => {
      // Throttle via rAF so it doesn't spam init
      requestAnimationFrame(init);
    };

    // Load script once
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      init();
    } else {
      if (!window.UnicornStudio) window.UnicornStudio = { isInitialized: false };
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      data-us-project={projectId}
      className={className}
      style={style}
    />
  );
}