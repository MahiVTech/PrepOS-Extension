# 🌸 MahiOS — Personal Learning Operating System

**Your personal space to learn, focus, track progress, and achieve your goals.**

MahiOS is a responsive, personalized learning dashboard designed to make studying more organized, productive, and enjoyable. It brings your learning goals, tasks, projects, revision, focus sessions, and AI-powered study assistance together in one place.

Built for students preparing for **GATE 2027**, learning Python and DSA, working on projects, and building consistent study habits.

✨ **Live Website:** [MahiOS](https://mahi-final-ten.vercel.app)

---

## 📌 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Deployment](#-deployment)
* [Integrations](#-integrations)
* [Chrome Extension](#-chrome-extension)
* [Data Storage & Privacy](#-data-storage--privacy)
* [Project Structure](#-project-structure)
* [Limitations](#-limitations)

---

## ✨ Features

### 📚 Learning Dashboard

* Track GATE 2027, Python, and DSA learning progress.
* Mark topics as completed and maintain revision progress.
* View learning statistics and progress analytics.
* Enjoy a light, pastel-themed interface with anime-inspired study companions.

### ✅ Task & Project Management

* Create, complete, filter, and delete study tasks.
* Create and manage projects with descriptions, technology stacks, and status updates.
* Keep your academic and personal projects organized in one place.

### ⏱️ Focus & Productivity

* Built-in Pomodoro timer for focused study sessions.
* Track focus sessions and review productivity analytics.
* Focus Lock adds confirmation prompts when switching pages and restricts timer resets while locked.
* Receive motivational messages when completing tasks, topics, and focus sessions.

### 🤖 Gemini-Powered Study Assistant

* Get study-focused assistance through the integrated AI chat.
* Uses a server-side API route to communicate with Gemini.
* Includes an API status diagnostic to check whether required environment variables are configured.

### 🎥 YouTube Learning Integration

* Import YouTube playlists into your learning dashboard.
* Automatically categorize lessons into GATE, DSA, Python, or Other.
* Manually change playlist categories and filter lessons.
* Track lesson completion and progress separately for each category.
* Watch lessons inside the app and automatically mark them complete when playback ends.

### 💻 LeetCode Integration

* View publicly available LeetCode profile statistics.
* Prefilled profile: `MahiVTech`.
* Stats may be unavailable due to third-party service limitations or rate limits.

### 🌷 Study Mentor

* An anime-inspired mentor stays accessible throughout the app.
* Get motivational messages when you complete learning goals.
* Optional voice feedback using the browser's built-in SpeechSynthesis.
* English motivational subtitles and spoken encouragement.

### 🧩 Chrome New Tab Extension

* A Chrome extension that brings the MahiOS learning experience to your new tab.
* Load the extension locally using Chrome's Developer mode.

---

## 🛠️ Tech Stack

| Technology        | Purpose                               |
| ----------------- | ------------------------------------- |
| React             | User interface                        |
| Vite              | Development server and build tool     |
| JavaScript        | Application logic                     |
| CSS               | Responsive styling and UI design      |
| Vercel            | Hosting and serverless API functions  |
| Gemini API        | AI study assistant                    |
| YouTube Data API  | Playlist integration                  |
| Local Storage     | Browser-side progress and preferences |
| Chrome Extensions | New Tab experience                    |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm (included with Node.js)
* Git (optional, for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/MahiVTech/PrepOS-Extension.git
cd PrepOS-Extension
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

> **Note:** The frontend runs through Vite. The `/api/*` endpoints are Vercel serverless functions and require Vercel deployment or a compatible local development environment.

---

## 🔐 Environment Variables

MahiOS uses server-side environment variables for its AI assistant and YouTube playlist integration.

Create a `.env.local` file in the project root for local configuration:

```env
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### Required API Keys

| Variable          | Purpose                            |
| ----------------- | ---------------------------------- |
| `GEMINI_API_KEY`  | Powers the Gemini study assistant  |
| `YOUTUBE_API_KEY` | Enables YouTube playlist importing |

**Security Guidelines**

* Never commit `.env.local` or real API keys to GitHub.
* Never expose API keys in frontend code.
* Use restricted API keys and configure appropriate usage limits.
* Keep `.env.example` limited to placeholder values.

---

## 🏗️ Build & Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated frontend build is available in the `dist/` directory.

---

## ☁️ Deployment

MahiOS is designed to be deployed on [Vercel](https://vercel.com/).

### Deploy using Vercel

1. Push the project to a GitHub repository.

2. Import the repository into Vercel.

3. Configure the project settings:

   * **Framework:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`

4. Open **Project Settings → Environment Variables**.

5. Add `GEMINI_API_KEY` and `YOUTUBE_API_KEY`.

6. Redeploy the project.

After deployment, the frontend and serverless API functions will be available through your Vercel deployment.

---

## 🔌 Integrations

### Gemini AI

The AI assistant communicates with Gemini through the server-side `/api/chat` function.

* Uses `GEMINI_API_KEY`.
* Keeps the API key on the server.
* Uses the Gemini Interactions API.
* Provides study-focused responses through a dedicated system instruction.

### YouTube

The YouTube integration uses the server-side `/api/youtube` function.

**Supported features:**

* Import public playlists.
* Automatically categorize lessons using title keywords.
* Assign playlists to GATE, DSA, Python, or Other.
* Track progress and completion within MahiOS.

YouTube's public Data API does not provide personal watch history. Therefore, videos watched in a separate YouTube tab cannot automatically be marked as completed.

### LeetCode

The Integrations page uses the public profile `MahiVTech` to attempt to retrieve statistics.

The stats endpoint is unofficial and community-maintained. Availability and accuracy depend on the external service.

---

## 🧩 Chrome Extension

MahiOS includes a Chrome New Tab extension.

### Installation

1. Extract the extension ZIP file.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project's `extension/` folder.
6. Open a new tab to access the extension.

---

## 💾 Data Storage & Privacy

MahiOS currently uses browser Local Storage for:

* Tasks and projects
* Topic completion and learning progress
* Focus-session records
* LeetCode statistics
* YouTube playlist progress and completion marks

### Important

* Data is stored locally in the browser.
* There is currently no account system or cloud synchronization across devices.
* Clearing browser data may remove locally stored progress.
* API keys are intended to remain on the server and should never be exposed in frontend code.

---

## ⚠️ Limitations

* No account system or cross-device cloud synchronization.
* LeetCode statistics depend on an unofficial external endpoint.
* YouTube watch history from outside MahiOS cannot be automatically detected.
* Speech quality depends on the voices available in the browser and operating system.
* Focus Lock cannot prevent users from closing the browser or forcibly leaving a page.

---

## 📂 Project Structure

```text
PrepOS-Extension/
├── api/
│   ├── chat.js
│   ├── status.js
│   └── youtube.js
├── extension/
│   ├── manifest.json
│   ├── newtab.html
│   ├── newtab.css
│   ├── newtab.js
│   └── icons/
├── public/
├── src/
├── tests/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── README.md
```

*The structure above is a simplified overview of the project.*

---

## 🌱 Future Improvements

* User authentication and cloud synchronization.
* Cross-device learning progress.
* Enhanced study analytics and personalized recommendations.
* More AI-powered learning and revision tools.
* Additional integrations for academic productivity.

---

## 💖 Made for Learners

MahiOS is built around one simple idea:

**Make learning organized, consistent, and enjoyable.**

Study smarter. Stay focused. Keep growing. 🌷

---

<p align="center">
  <b>MahiOS — Your Learning. Your Progress. Your Space.</b>
</p>
