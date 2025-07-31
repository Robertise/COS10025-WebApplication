import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Activity, Wind, Leaf, SunDim, RulerDimensionLine, Gauge, CloudHail, AudioWaveform } from 'lucide-react';
import { GetTimeDisplay, getSensorStatus } from '../hooks/getComponents';
import { getApi } from '../hooks/getApiData';


const SmartSensors = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [environmentalData, setEnvironmentalData] = useState([]);
  const [structuralData, setStructuralData] = useState([]);

  // Fetch Sensor Data
  const fetchingData = async () => {
    // Fetch Sensors Data
    try {
      const sensorData = await getApi('/sensors');
      setEnvironmentalData(sensorData.environmentalsensors || []);
      setStructuralData(sensorData.structuralsensors || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error detected: ", err);
      setIsLoading(false);
    }
  };

  // Auto reload
  useEffect(() => {
    fetchingData();
    const interval = setInterval(fetchingData, 5000);
    return () => clearInterval(interval);
  }, []);


  // Set Loading animation
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 mb-150">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }



  return (
    <div>
      {/* Hero Section */}
      <section className="py-15">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Environmental Monitoring System
          </h1>
          <GetTimeDisplay/>
        </div>
      </section>

      <hr className="flex-grow border-t border-gray-300 max-w-7xl mx-auto"/>

      {/* Environmental Status */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Environmental Status</h2>
            <p className="text-gray-600">Current values of environmental sensors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Thermometer className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Temperature</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.temp[0].sensorvalue}<span className="text-lg">°C</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.temp[0].sensorvalue, "temp")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.temp[0].sensorvalue, "temp")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Humidity</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.hum[0].sensorvalue}<span className="text-lg">%</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.hum[0].sensorvalue, "hum")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.hum[0].sensorvalue, "hum")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Air Quality</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.air[0].sensorvalue}<span className="text-lg">AQI</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.air[0].sensorvalue, "air")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.air[0].sensorvalue, "air")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Wind className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Wind Speed</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.wind[0].sensorvalue}<span className="text-lg">m/s</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.wind[0].sensorvalue, "wind")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.wind[0].sensorvalue, "wind")[1]}</span>
            </div>

            <div></div>

            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <SunDim className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Light Intensity</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.light[0].sensorvalue}<span className="text-lg">lux</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.light[0].sensorvalue, "light")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.light[0].sensorvalue, "light")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <CloudHail className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Rain Rate</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{environmentalData.rain[0].sensorvalue}<span className="text-lg">mm/hr</span></div>
              <span className={`text-sm ${getSensorStatus(environmentalData.rain[0].sensorvalue, "rain")[0]} px-2 py-1 rounded`}>{getSensorStatus(environmentalData.rain[0].sensorvalue, "rain")[1]}</span>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Structural Health Monitoring</h2>
            <p className="text-gray-600">Current values of structural health monitoring sensors</p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Vibration</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{structuralData.vibration[0].sensorvalue}<span className="text-lg">g</span></div>
              <span className={`text-sm ${getSensorStatus(structuralData.vibration[0].sensorvalue, "vibration")[0]} px-2 py-1 rounded`}>{getSensorStatus(structuralData.vibration[0].sensorvalue, "vibration")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <Gauge className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Strain Gauges</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{structuralData.strain_gauges[0].sensorvalue}<span className="text-lg">μϵ</span></div>
              <span className={`text-sm ${getSensorStatus(structuralData.strain_gauges[0].sensorvalue, "strain_gauges")[0]} px-2 py-1 rounded`}>{getSensorStatus(structuralData.strain_gauges[0].sensorvalue, "strain_gauges")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <RulerDimensionLine className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Tiltmeters</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{structuralData.tiltmeters[0].sensorvalue}<span className="text-lg">°/month</span></div>
              <span className={`text-sm ${getSensorStatus(structuralData.tiltmeters[0].sensorvalue, "tiltmeters")[0]} px-2 py-1 rounded`}>{getSensorStatus(structuralData.tiltmeters[0].sensorvalue, "tiltmeters")[1]}</span>
            </div>
            
            <div className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105">
              <div className="flex justify-center mb-4">
                <AudioWaveform className="w-8 h-8 text-fuchsia-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Acoustic Emission</h3>
              <div className="text-3xl font-bold text-gray-900 mb-3">{structuralData.acoustic_emission[0].sensorvalue}<span className="text-lg">kHz</span></div>
              <span className={`text-sm ${getSensorStatus(structuralData.acoustic_emission[0].sensorvalue, "acoustic_emission")[0]} px-2 py-1 rounded`}>{getSensorStatus(structuralData.acoustic_emission[0].sensorvalue, "acoustic_emission")[1]}</span>
            </div>
          </div>
        </div>
      </section>


      {/* Sensor Data Over Time */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sensor Data Over Time</h2>
            <p className="text-gray-600">24-hour tracking of environmental conditions</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Temperature</h3>
            <p className="text-gray-600 mb-6">Degrees Celsius</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={environmentalData.temp}>
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(ts) => {
                      const date = new Date(ts);
                      return date.toTimeString().slice(0, 5); 
                    }}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="sensorvalue" 
                    stroke="#374151" 
                    strokeWidth={2}
                    dot={false}
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right mt-4">
              <span className="text-sm text-gray-500">Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Sensors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Active Sensors</h2>
            <p className="text-gray-600">Details of currently active environmental sensors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Sensor ID: 001</h3>
                <p className="text-sm text-gray-600">Type: Temperature</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Location: Royal</p>
                <p className="text-sm font-medium text-gray-900">Mausoleum • Status:</p>
                <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Warning</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Sensor ID: 002</h3>
                <p className="text-sm text-gray-600">Type: Humidity</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Location: Ancient</p>
                <p className="text-sm font-medium text-gray-900">Temple • Status:</p>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Safe</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Sensor ID: 003</h3>
                <p className="text-sm text-gray-600">Type: Vibration</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Location: Tomb of the</p>
                <p className="text-sm font-medium text-gray-900">Chinese Emperors •</p>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Safe</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Wind className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Sensor ID: 004</h3>
                <p className="text-sm text-gray-600">Type: Air Quality</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Location: Sacred</p>
                <p className="text-sm font-medium text-gray-900">Pagoda • Status:</p>
                <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">
            Immediate action available for alerts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SmartSensors;