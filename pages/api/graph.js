import { fetchContributions } from '../../utils/fetchContributions';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const contributions = await fetchContributions(username);
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}