import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// GET DATA OF THE ALERTS
async function SensorAlerts() {
  try {
    // Single query to get all relevant sensor types
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .gte('alerttime', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('alertid', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return [];
    };

    return data;

  } catch (err) {
    console.error('Database fetching error:', err);
    return [];
  }
};


// GET ALL ALERTS DATA
export const getAlerts = async (req, res) => {
  try {
    // Default return all sensors data
    const alertData = await SensorAlerts();

    res.json(alertData);

  } catch (err) {
    console.error('Database error: ', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching sensors',
      error: err.message
    });
  }
}