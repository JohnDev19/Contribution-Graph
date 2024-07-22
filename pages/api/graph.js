import { fetchContributions } from '../../utils/fetchContributions';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const pngBuffer = await fetchContributions(username, process.env.GITHUB_TOKEN);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).send(pngBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
