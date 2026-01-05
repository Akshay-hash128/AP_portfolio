import { useEffect, useRef } from "react";

export default function UnicornEmbed({
  projectId = "MZNZ3utZ7eUYmFgSShpk",
  width = "100%",
  height = "100%",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    // If UnicornStudio already exists, just init again
    if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      return;
    }

    // Exact logic from UnicornStudio embed
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";

      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
          console.log("UnicornEmbed mounted", projectId);

        }
      };

      (document.head || document.body).appendChild(script);
      
    }
  }, []);

  return (
    <div
      ref={ref}
      data-us-project={projectId}
      className={className}
      style={{ width, height }}
      
    />
  );
}
