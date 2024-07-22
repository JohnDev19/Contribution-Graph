import { fetchContributions } from '../../utils/fetchContributions';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const contributions = await fetchContributions(username, process.env.GITHUB_TOKEN);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(contributions.svg);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
