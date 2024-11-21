import React, { useState } from "react";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // List of languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish (Español)" },
    { code: "ja", name: "Japanese (日本語)" },
    { code: "ko", name: "Korean (한국어)" },
    { code: "zh", name: "Chinese (中文)" },
    { code: "de", name: "German (Deutsch)" },
    { code: "bn", name: "Bangla (বাংলা)" },
    { code: "hi", name: "Hindi (हिन्दी)" },
    { code: "fr", name: "French (Français)" },
    { code: "it", name: "Italian (Italiano)" },
    { code: "pt", name: "Portuguese (Português)" },
    { code: "ru", name: "Russian (Русский)" },
    { code: "tr", name: "Turkish (Türkçe)" },
    { code: "pl", name: "Polish (Polski)" },
    { code: "ar", name: "Arabic (العربية)" },
    { code: "id", name: "Indonesian (Bahasa Indonesia)" },
    { code: "ms", name: "Malay (Bahasa Melayu)" },
    { code: "th", name: "Thai (ภาษาไทย)" },
    { code: "vi", name: "Vietnamese (tiếng việt)" },
    { code: "uk", name: "Ukrainian (українська)" },
    { code: "he", name: "Hebrew (עברית)" },
    { code: "tl", name: "Tagalog (Filipino)" },
    { code: "ro", name: "Romanian (Română)" },
    { code: "hu", name: "Hungarian (Magyar)" },
    { code: "cs", name: "Czech (Čeština)" },
    { code: "fi", name: "Finnish (Suomi)" },
    { code: "no", name: "Norwegian (Norsk)" },
    { code: "sk", name: "Slovak (Slovenčina)" },
    { code: "el", name: "Greek (Ελληνικά)" },
    { code: "bg", name: "Bulgarian (Български)" },
    { code: "zh-TW", name: "Traditional Chinese (繁體中文)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ml", name: "Malayalam (മലയാളം)" },
    { code: "sq", name: "Albanian (Shqip)" },
    { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
    { code: "ta", name: "Tamil (தமிழ்)" },
    { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
    { code: "mr", name: "Marathi (मराठी)" },
    { code: "gu", name: "Gujarati (ગુજરાતી)" },
    { code: "or", name: "Odia (ଓଡିଆ)" },
    { code: "te", name: "Telugu (తెలుగు)" },
    { code: "my", name: "Burmese (မြန်မာ)" },
    { code: "si", name: "Sinhala (සිංහල)" },
    { code: "ne", name: "Nepali (नेपाली)" }
  ];

  // Sort languages alphabetically by name
  const sortedLanguages = languages.sort((a, b) => a.name.localeCompare(b.name));

  const handleDownload = () => {
    const url = `http://localhost:5000/translate?targetLanguage=${selectedLanguage}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `README-${selectedLanguage}.md`;
    link.click();
  };

  return (
    <div>
      <h1>Download Translated README</h1>
      <label htmlFor="language-select">Select Language:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {sortedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default App;
