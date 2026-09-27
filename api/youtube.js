export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET for playlist import.' });
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'YouTube import is not configured. Add YOUTUBE_API_KEY in deployment environment.' });
  const playlistId = String(req.query?.playlistId || '').trim();
  if (!playlistId || playlistId.length > 200) return res.status(400).json({ error: 'A valid playlistId is required.' });
  try {
    let pageToken = '', all = [];
    for (let page = 0; page < 4; page++) {
      const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
      url.searchParams.set('part', 'snippet,contentDetails');
      url.searchParams.set('playlistId', playlistId);
      url.searchParams.set('maxResults', '50');
      url.searchParams.set('key', apiKey);
      if (pageToken) url.searchParams.set('pageToken', pageToken);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'YouTube playlist request failed.' });
      all = all.concat((data.items || []).filter(item => item.snippet?.title !== 'Deleted video').map(item => ({
        id: item.contentDetails?.videoId || item.snippet?.resourceId?.videoId,
        title: item.snippet?.title || 'Untitled video',
        channel: item.snippet?.channelTitle || '',
        thumb: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || '',
        done: false
      })).filter(item => item.id));
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }
    return res.status(200).json({ items: all });
  } catch {
    return res.status(502).json({ error: 'Could not reach YouTube. Try again in a moment.' });
  }
}
