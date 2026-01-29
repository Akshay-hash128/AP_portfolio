import { useEffect, useRef } from "react";

export default function UnicornEmbed({
  projectId = "MZNZ3utZ7eUYmFgSShpk",
  width = "100%",
  height = "100%",
  className = "",
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const SRC =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";

    const init = () => {
      if (window.UnicornStudio?.init) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    const onResize = () => requestAnimationFrame(init);

    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) init();
    else {
      if (!window.UnicornStudio) window.UnicornStudio = { isInitialized: false };
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      data-us-project={projectId}
      className={className}
      style={{ width, height, ...style }}
    />
  );
}