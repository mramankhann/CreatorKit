<h1 align="center">
  <br>
  ⚡ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿𝗞𝗶𝘁 ⚡
  <br>
</h1>

<h4 align="center">𝗢𝗻𝗲 𝗮𝗽𝗽. 𝗧𝘄𝗼 𝘀𝘂𝗽𝗲𝗿𝗽𝗼𝘄𝗲𝗿𝘀. 𝗭𝗲𝗿𝗼 𝗳𝗿𝗶𝗰𝘁𝗶𝗼𝗻.</h4>

<p align="center">
  <i>A focused, dual-feature mobile utility for content creators and social media managers to repurpose video content and craft platform-perfect bios in seconds.</i>
</p>

<p align="center">
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-core-features">Features</a> •
  <a href="#-tech-architecture">Architecture</a> •
  <a href="#-ui--design">UI Design</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

<br>

## 📖 𝗔𝗯𝗼𝘂𝘁 𝘁𝗵𝗲 𝗣𝗿𝗼𝗷𝗲𝗰𝘁

**CreatorKit** is designed to solve two daily friction points for freelance social media managers, aspiring influencers, and small business owners:
1. Downloading cross-platform video inspiration/content quickly.
2. Writing highly optimized, platform-specific bios without the headache of staring at a blank screen.

---

## ✨ 𝗖𝗼𝗿𝗲 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀

### 📥 1. Universal Video Downloader
Save videos from top social platforms to your device gallery in under 10 seconds.
* **Supported Platforms:** Instagram (Reels/Posts), YouTube (Standard/Shorts), Facebook Videos.
* **Quality Options:** Auto (best available), 720p, 1080p, or Audio-only (MP3).
  
### 🤖 2. AI Bio Generator
Craft personalized, platform-optimized bios in under 30 seconds.
* **Multimodal Input:** Type a free-text topic (e.g., *"fitness coach..."*) AI to analyze your aesthetic and infer a persona.
* **Omnichannel Output:** Generates bios simultaneously for **LinkedIn, Instagram, YouTube, TikTok, Twitter/X, and Facebook**.
* **Smart Constraints:** Automatically respects platform character limits.
* **Tone Selector:** *Professional, Casual, Bold, Witty, Minimal.*

---

## 🏗 𝗧𝗲𝗰𝗵 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲

The project prioritizes a lightweight client with heavy lifting deferred to a scalable cloud backend.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | `React Native` | Single codebase for iOS & Android. |
| **Backend API** | `Node.js + Express` | Deployed on **AWS Lambda** for scalability. |
| **Video Processing** | `yt-dlp` | Server-side extraction API. No on-device scraping. |
| **AI Text Engine** | `Claude API` | Claude 3 Sonnet with platform-specific system prompts. |
| **AI Vision Engine**| `Claude Vision API` | Analyzes uploaded context images for tone/niche. |
| **Storage** | `React Native FS` | Local storage only. No cloud storage of user videos. |

---

## 📱 𝗨𝗜 & 𝗗𝗲𝘀𝗶𝗴𝗻

CreatorKit utilizes a clean, "pro-sumer" aesthetic. 
* **Primary Accent:** Indigo (`#4C63D2`)
* **Typography:** `DM Sans` (warmth & readability) + `Space Mono` (technical/status elements)
* **Philosophy:** Radical simplicity. Two tabs, zero clutter.

<p align="center">
  Designed & Built for Creators. <br>
  <b>© 2024 CreatorKit - Mohd Aman</b>
</p>
