import { getSensors } from './_getSensors.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await getSensors(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
