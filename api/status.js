export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET for status.' });
  return res.status(200).json({
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    youtubeConfigured: Boolean(process.env.YOUTUBE_API_KEY),
    checkedAt: new Date().toISOString()
  });
}
