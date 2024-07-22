import { fetchContributions } from '../../utils/fetchContributions';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const svgString = await fetchContributions(username, process.env.GITHUB_TOKEN);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ svg: svgString });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
