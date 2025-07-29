import { getSensors } from '../../backend/functions/getSensors.js'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return getSensors(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
