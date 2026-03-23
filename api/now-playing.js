export default async function handler(req, res) {
  // 1. Set CORS headers so your GitHub blog can talk to Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const username = "JoelJarcor";
  const apiKey = process.env.LASTFM_API_KEY; // We will set this in Vercel
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Send the data back to your blog
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from Last.fm" });
  }
}
