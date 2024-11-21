import express from "express";
import translate from "translate-google";
import cors from "cors";

const app = express();
const port = 5000;

// Enable CORS for the frontend running on localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// Inline README content
const readmeContent = `
<div align="center" id="initial">
  <a href="https://chimoney.io/" target="_blank">
  <picture>
    <img src="https://chimoney.io/assets/icons/chimoney-purple-logo.svg" width="280" alt="Logo"/>
  </picture>
  </a>
</div>

<h1 align = "center">Chimoney Community Projects</h1>

<p align="center">🎉 We're participating in Hacktoberfest 2024! 🎉</p>

---

Welcome to Hacktoberfest 2024 brought to you by Chimoney! This is your complete guide to contributing to Chimoney's open-source projects.

> ⭐️ If you're new to Hacktoberfest, you can learn more and register to participate [here](https://hacktoberfest.com/participation/). Registration is from **September 26th - October 31st**.

---

### Available in Multiple Languages

You can view this README in your preferred language:

- [English](README.md)
- [Spanish (Español)](README-ES.md)
- [Japanese (日本語)](README-JP.md)
- [Korean (한국어)](README-KO.md)
- [Chinese (中文)](README-CN.md)
- [German (Deutsch)](README-GM.md)
- [Bangla (বাংলা)](README-BN.md)
- [Hindi (हिन्दी)](README-HN.md)
- [French (Français)](README-FR.md)
- [Italian (Italiano)](README-IT.md)
- [Portuguese (Português)](README-PT.md)
- [Russian (Русский)](README-RU.md)
- [Turkish (Türkçe)](README-TR.md)
- [Polish (Polski)](README-PL.md)
- [Arabic (العربية)](README-AR.md)
- [Indonesian (Bahasa Indonesia)](README-ID.md)
- [Malay (Bahasa Melayu)](README-MS.md)
- [Thai (ภาษาไทย)](README-TH.md)
- [Vietnamese (Tiếng Việt)](README-VI.md)
- [Ukrainian (Українська)](README-UA.md)
- [Hebrew (עברית)](README-HE.md)
- [Tagalog (Filipino)](README-TL.md)
- [Romanian (Română)](README-RO.md)
- [Hungarian (Magyar)](README-HU.md)
- [Czech (Čeština)](README-CS.md)
- [Finnish (Suomi)](README-FI.md)
- [Norwegian (Norsk)](README-NO.md)
- [Slovak (Slovenčina)](README-SK.md)
- [Greek (Ελληνικά)](README-EL.md)
- [Bulgarian (Български)](README-BG.md)
- [Traditional Chinese (繁體中文)](README-ZH-TW.md)
- [Hindi (India)](README-HI-IN.md)
- [Malayalam (മലയാളം)](README-ML.md)
- [Albanian (Shqip)](README-SQ.md)
- [Punjabi (ਪੰਜਾਬੀ)](README-PA.md)
- [Tamil (தமிழ்)](README-TA.md)
- [Kannada (ಕನ್ನಡ)](README-KN.md)
- [Marathi (मराठी)](README-MR.md)
- [Gujarati (ગુજરાતી)](README-GU.md)
- [Odia (ଓଡିଆ)](README-OR.md)
- [Telugu (తెలుగు)](README-TE.md)
- [Burmese (မြန်မာ)](README-MY.md)
- [Sinhala (සිංහල)](README-SI.md)
- [Nepali (नेपाली)](README-NE.md)

---

<p align="center">
<a href="https://chimoney.readme.io/reference/introduction" rel="dofollow"><strong>Explore the docs »</strong></a>
</p>
<p align="center">
<a href="https://chimoney.readme.io/reference/introduction" rel="dofollow">
  <img src="https://img.shields.io/badge/Chimoney%20API%20Docs%20%E2%96%BA-670c78" alt="Chimoney API Docs">
</a>

---

   <br />
    <br />
 <p align="center">
<a href="https://chimoney.io/toolkit/"><u>Developer Toolkit</u></a>. 
<a href="https://discord.gg/Q3peDrPG95"><u>Discord Community</u></a>
    ·
<a href="https://chimoney.io/api-use-cases/"><u>API Use Cases</u></a>. 
<a href="https://x.com/chimoney_io"><u>Twitter (X)</u></a>
    ·
<a href="mailto:community@chimoney.com"><u>Email</u></a>
  </p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Chimoney Rewards](#chimoney-rewards)
- [Obtaining API Keys](#obtaining-api-keys)
- [Project Setup](#project-setup)
- [Submission Process](#submission-process)
- [Contribute via Gitpod](#contribute-via-gitpod)
- [Mentorship](#mentorship)
- [License](#license)
- [Contact & Resources](#contact--resources)
- [A Big Thank You to All Our Awesome Contributors ❤️](#a-big-thank-you-to-all-our-awesome-contributors-️)

## Introduction

Join us for a month of coding, learning, and contributing to Chimoney's open-source projects!
...

## License

This project is licensed under the [MIT License](https://github.com/Chimoney/chimoney-community-projects/blob/main/LICENSE).

## Contact & Resources

If you need assistance or have questions, please contact us at [community@chimoney.com](mailto:community@chimoney.com).
`;

const excludePatterns = (content) => {
  // Match HTML tags, inline code, and block code
  return content.replace(
    /<(\/?[a-zA-Z][^>\s]*)[^>]*?>|`[^`]+`|```[\s\S]*?```|&[a-zA-Z]+;/g,
    (match) => `{{${match}}}`
  );
};



const restorePatterns = (translated, original) => {
  const originalMatches = [
    ...original.matchAll(/<(\/?[a-zA-Z][^>\s]*)[^>]*?>|`[^`]+`|```[\s\S]*?```|&[a-zA-Z]+;/g),
  ];
  return translated.replace(/{{[^}]+}}/g, () => originalMatches.shift()?.[0] || "");
};




// Extended supported languages
const supportedLanguages = [
  "en", "es", "ja", "ko", "zh", "de", "bn", "hi", "fr", "it", "pt", "ru", "tr", "pl", "ar",
  "id", "ms", "th", "vi", "uk", "he", "tl", "ro", "hu", "cs", "fi", "no", "sk", "el",
  "bg", "zh-TW", "hi-IN", "ml", "sq", "pa", "ta", "kn", "mr", "gu", "or", "te", "my", "si", "ne"
];

// Endpoint to translate README
app.get("/translate", async (req, res) => {
  const { targetLanguage } = req.query;

  if (!targetLanguage || !supportedLanguages.includes(targetLanguage)) {
    return res.status(400).send("Valid target language is required");
  }

  try {
    const processedContent = excludePatterns(readmeContent);

    const translated = await translate(processedContent, {
      to: targetLanguage,
    });
    const finalContent = restorePatterns(translated, readmeContent);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=README-${targetLanguage}.md`
    );
    res.setHeader("Content-Type", "text/markdown");
    res.send(finalContent);
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).send("Error during translation");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
