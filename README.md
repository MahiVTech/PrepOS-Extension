# MahiOS — Personal Learning Operating System

A responsive learning dashboard for GATE 2027, Python, DSA, focus sessions, revision, tasks, projects, LeetCode stats, YouTube playlist lessons, and a Gemini-powered study assistant. Includes a Chrome New Tab extension.

## Run locally
```bash
npm install
npm run dev
```

The Vite preview serves the frontend. The `/api/*` functions are Vercel serverless functions, so AI and YouTube API routes are available after deploying to Vercel (or using Vercel's local development CLI).

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import it in Vercel.
3. Build command: `npm run build`; output directory: `dist`.
4. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY` and `YOUTUBE_API_KEY` using newly rotated, restricted keys. Never add secrets to frontend code or commit them to Git.
5. Redeploy after adding environment variables.

## Features
- Cute anime study companions with a clickable rotating motivation message on the overview dashboard.
- Light-first responsive dashboard with a soft illustrated moodboard backdrop across pages, framed mentor portrait artwork, glassy pastel cards, and a cozy anime study-buddy scene with rotating encouragement messages.
- GATE, Python, and DSA topic trackers with local persistence.
- Task manager: add, complete, filter, and delete tasks.
- Project studio: create, edit, update status/stack, and delete projects.
- Pomodoro timer and focus-session analytics.
- Revision and progress analytics.
- LeetCode profile lookup prefilled for `MahiVTech` (public stats endpoint; unofficial and may be rate-limited).
- YouTube playlist import through a server-side API proxy, automatic title-based grouping into GATE / DSA / Python / Other, manual category override, separate per-path completion cards, filters, and local watch-progress tracking while a video plays inside the app.
- Gemini-powered AI assistant through a server-side API route, with a live `/api/status` diagnostic that reports whether required keys are configured without exposing them.
- Chrome New Tab extension in `extension/`.

## Integrations

### LeetCode
The Integrations page is prefilled with `MahiVTech` and attempts to load public profile statistics. The stats endpoint is community-maintained and unofficial; it can be unavailable or rate-limited. No LeetCode login or private account data is accessed.

### YouTube
The playlist URL is prefilled. In Integrations, select Auto-detect to classify lessons by title keywords or explicitly assign the playlist to GATE, DSA, Python, or Other. Progress is shown separately for each category and can be filtered. You can import another playlist under a different category; previously imported videos and completion marks are retained. Add `YOUTUBE_API_KEY` as a Vercel environment variable to import playlist videos. The key is used only in the server-side `/api/youtube` function. YouTube's public Data API does **not** expose personal watch history, so MahiOS cannot automatically detect videos watched in a separate YouTube tab. Open a playlist lesson in the embedded MahiOS player to have it marked complete automatically when playback ends; manual completion is also available.

### Gemini AI
The assistant calls `/api/chat`, a server-side function that uses `GEMINI_API_KEY`. Add the key in Vercel environment variables and redeploy. The key is not stored in browser storage or shipped in frontend code. The API route uses Gemini Flash and provides a study-focused system instruction.

### Data storage
Tasks, projects, topic completion, focus sessions, LeetCode stats, and playlist checkmarks are stored in this browser's local storage. There is no account system or cloud sync across devices yet.

## Chrome extension
1. Extract the ZIP.
2. Open `chrome://extensions` and enable Developer mode.
3. Click **Load unpacked** and choose the `extension/` folder.
4. Open a new tab.

## Environment variable names
See `.env.example` for placeholders only. Never put actual keys in that file.

## Study Mentor (new)
- A single anime-style mentor card stays available across the app; it reacts with praise when a task or learning topic is marked complete and celebrates a finished focus session.
- **Voice toggle:** uses the browser's built-in SpeechSynthesis voice, with English text, a lower pitch, slower delivery, and phonetic pronunciation of Mahi as “Mah-ee”. The exact voice/timbre depends on voices installed in the browser/OS; a truly custom deep male voice would require a licensed audio/TTS service.
- **Focus Lock:** while a timer is running, switching pages while lock is enabled asks for confirmation; resetting is disabled until unlocked, and leaving/reloading the browser tab triggers its standard warning. Browsers do not allow a website to absolutely prevent someone from closing a tab or browser.
- Focus timer completion, task completion, and topic completion produce English motivational subtitles; audio plays when voice is enabled.


### Gemini model update
The chat endpoint uses Gemini 3.8 Flash through the Interactions API (`/v1beta/interactions`). Set `GEMINI_API_KEY` in Vercel Project Settings → Environment Variables and redeploy. API keys must remain server-side.
