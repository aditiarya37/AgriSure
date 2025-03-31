import React from "react";
import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate when script loads
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "hi", layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };
  }, []);

  // Function to switch languages
  const translateLanguage = (lang: string) => {
    const frame = document.querySelector(".goog-te-menu-frame");
    if (frame) {
      const buttons = (frame as HTMLIFrameElement).contentDocument?.querySelectorAll(".goog-te-menu2-item span.text");
      buttons?.forEach((btn) => {
        if (btn.textContent?.toLowerCase() === lang.toLowerCase()) {
          (btn as HTMLElement).click();
        }
      });
    }
  };

  return (
    <div style={{ textAlign: "right", padding: "10px", marginTop: "80px", background: "#f8f9fa" }}>
      <label htmlFor="language-selector" style={{ marginRight: "8px" }}>Choose Language:</label>
      <select id="language-selector" onChange={(e) => translateLanguage(e.target.value)} style={{ padding: "5px", fontSize: "16px", border: "1px solid #ccc", backgroundColor: "white", cursor: "pointer" }}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default LanguageSelector;
