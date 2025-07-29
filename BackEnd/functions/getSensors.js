import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// GET DATA OF THE SENSORS
async function EnvironmentalSensor() {
  try {
    // Single query to get all relevant sensor types
    const { data, error } = await supabase
      .from('environmentalsensors')
      .select('*')
      .in('sensortype', ['temp', 'hum', 'rain', 'air', 'light', 'wind'])
      .order('environmentalsensorid', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return [];
    };

    // Group by sensortype
    const grouped = {
      temp: [],
      hum: [],
      rain: [],
      air: [],
      light: [],
      wind: []
    };

    for (const record of data) {
      const type = record.sensortype;
      if (grouped[type]?.length < 7) {
        grouped[type].push(record);
      }
    };

    return grouped;

  } catch (err) {
    console.error('Database fetching error:', err);
    return [];
  }
}



// GET DATA OF THE SENSORS
async function StructuralSensor() {
  try {
    const { data, error } = await supabase
      .from('structuralsensors')
      .select('*')
      .in('sensortype', ['vibration', 'strain_gauges', 'tiltmeters', 'acoustic_emission'])
      .order('structuralsensorid', { ascending: false });

    if (error) {
      console.error('Database error: ', error);
      return [];
    };

    const grouped = {
      vibration: [],
      strain_gauges: [],
      tiltmeters: [],
      acoustic_emission: []
    };

    for (const record of data) {
      const type = record.sensortype;
      if (grouped[type]?.length < 7) {
        grouped[type].push(record);
      }
    };
    
    return grouped;
  } catch (err) {
    console.error('Database fetching error: ', err);
    return [];
  }
};


// GET ALL SENSORS DATA
export const getSensors = async (req, res) => {
  try {
    // Default return all sensors data
    const [environmentalData, structuralData] = await Promise.all([
      EnvironmentalSensor(),
      StructuralSensor()
    ]);

    res.json({
      environmentalsensors: {
        temp: environmentalData.temp,
        hum: environmentalData.hum,
        air: environmentalData.air,
        rain: environmentalData.rain,
        light: environmentalData.light,
        wind: environmentalData.wind
      },
      structuralsensors: {
        vibration: structuralData.vibration,
        strain_gauges: structuralData.strain_gauges,
        tiltmeters: structuralData.tiltmeters,
        acoustic_emission: structuralData.acoustic_emission
      }
    });

  } catch (err) {
    console.error('Database error: ', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching sensors',
      error: err.message
    });
  }
}