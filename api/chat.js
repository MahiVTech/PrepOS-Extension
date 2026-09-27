export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST for chat.' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Gemini is not configured. Add GEMINI_API_KEY in your deployment environment.' });

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  if (message.length > 12000) return res.status(413).json({ error: 'Message is too long. Keep it under 12,000 characters.' });

  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-10).map(item => {
    const role = item?.role === 'model' || item?.role === 'assistant' ? 'Assistant' : 'User';
    const text = String(item?.text || '').trim().slice(0, 5000);
    return text ? `${role}: ${text}` : '';
  }).filter(Boolean) : [];

  const input = [...history, `User: ${message}`, 'Assistant:'].join('\n\n');
  const maxAttempts = 3;
  let lastStatus = 502;
  let lastMessage = 'Could not reach Gemini. Try again in a moment.';
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          model: 'gemini-3.8-flash',
          input,
          system_instruction: 'You are MahiOS, a friendly and practical study companion for a B.Tech CS-AI student. Explain in simple, natural Hinglish when the user writes in Hinglish. Keep normal answers short and easy to scan: start with a 1-2 sentence direct answer, then use 3-6 short bullets or numbered steps only when useful. Use clear headings for longer answers, short paragraphs, and blank lines between sections. Avoid huge walls of text, excessive detail, repeated points, decorative separators, and too many nested bullets. For DSA or study explanations, explain one concept at a time and include only one small example unless the user asks for all cases. Use Markdown **bold** for key terms and `code` for code/commands. For coding, provide correct examples and explain errors simply. Do not claim to access live accounts or external progress unless data is supplied.',
          store: false
        })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        const reply = (typeof data.output_text === 'string' ? data.output_text : (data.steps || []).filter(step => step.type === 'model_output').flatMap(step => step.content || []).filter(item => item.type === 'text').map(item => item.text || '').join('\n')).trim();
        if (!reply) return res.status(502).json({ error: 'Gemini returned no text. Try again.' });
        return res.status(200).json({ reply });
      }
      lastStatus = response.status;
      lastMessage = data.error?.message || data.message || 'Gemini request failed.';
      const retryable = [429, 500, 502, 503, 504].includes(response.status);
      if (!retryable || attempt === maxAttempts - 1) break;
    } catch {
      lastStatus = 502;
      lastMessage = 'Could not reach Gemini. Try again in a moment.';
      if (attempt === maxAttempts - 1) break;
    }
    await new Promise(resolve => setTimeout(resolve, 500 * (2 ** attempt)));
  }
  return res.status(lastStatus).json({ error: lastMessage, retryable: [429, 500, 502, 503, 504].includes(lastStatus) });
}
