import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Thermometer, Droplets, Activity, Wind, Leaf, SunDim, RulerDimensionLine, Gauge, CloudHail, AudioWaveform, AlertTriangle } from 'lucide-react';
import { GetTimeDisplay, getSensorStatus } from '../hooks/getComponents';
import { getApi } from '../hooks/getApiData';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TimeAgo from 'react-timeago';

const SmartSensors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const [environmentalData, setEnvironmentalData] = useState([]);
  const [structuralData, setStructuralData] = useState([]);
  const [alertData, setAlertData] = useState([]);

  const openModal = (sensorType, sensorData, sensorInfo) => {
    setSelectedSensor({ type: sensorType, data: sensorData, info: sensorInfo });
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSensor(null);
  };

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


    // Fetch Alerts Data
    try {
      const alertData = await getApi('/alerts');
      setAlertData(alertData || []);
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

  // Sensor configuration for easy mapping
  const sensorConfig = {
    environmental: {
      temp: {
        icon: Thermometer,
        color: 'text-red-500',
        bgColor: 'bg-red-100',
        title: 'Temperature',
        unit: '°C',
        description: 'Ambient temperature monitoring'
      },
      hum: {
        icon: Droplets,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        title: 'Humidity',
        unit: '%',
        description: 'Relative humidity levels'
      },
      air: {
        icon: Leaf,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
        title: 'Air Quality',
        unit: 'AQI',
        description: 'Air quality index monitoring'
      },
      wind: {
        icon: Wind,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-100',
        title: 'Wind Speed',
        unit: 'm/s',
        description: 'Wind velocity measurements'
      },
      light: {
        icon: SunDim,
        color: 'text-amber-500',
        bgColor: 'bg-amber-100',
        title: 'Light Intensity',
        unit: 'lux',
        description: 'Illumination level monitoring'
      },
      rain: {
        icon: CloudHail,
        color: 'text-teal-500',
        bgColor: 'bg-teal-100',
        title: 'Rain Rate',
        unit: 'mm/hr',
        description: 'Precipitation rate measurement'
      }
    },
    structural: {
      vibration: {
        icon: Activity,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
        title: 'Vibration',
        unit: 'g',
        description: 'Structural vibration monitoring'
      },
      strain_gauges: {
        icon: Gauge,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-100',
        title: 'Strain Gauges',
        unit: 'μϵ',
        description: 'Material strain measurement'
      },
      tiltmeters: {
        icon: RulerDimensionLine,
        color: 'text-gray-500',
        bgColor: 'bg-gray-100',
        title: 'Tiltmeters',
        unit: '°/month',
        description: 'Structural tilt monitoring'
      },
      acoustic_emission: {
        icon: AudioWaveform,
        color: 'text-fuchsia-500',
        bgColor: 'bg-fuchsia-100',
        title: 'Acoustic Emission',
        unit: 'kHz',
        description: 'Sound emission detection'
      }
    }
  };

  // Recent Alert
  const recentAlert = alertData.filter(alert => {
    const nowTime = Date.now(); 
    const twentyFourHoursAgo = new Date(nowTime - 24 * 60 * 60 * 1000); 
    const itemTimestamp = new Date(alert.alerttime); 
    return itemTimestamp >= twentyFourHoursAgo;
  });

  // Modal sensors content
  const ModelContent = () => {
    if (!selectedSensor) return null;

    const { type, data, info } = selectedSensor;
    const config = info;

    return (
      <div className="p-4 md:p-7 modal-scrollbar max-h-[95vh] overflow-y-auto">
        <div className="flex items-center mb-6">
          <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center mr-4`}>
            <config.icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{config.title}</h3>
            <p className="text-gray-600">{config.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Current Value</h4>
            <div className="text-2xl font-bold text-gray-900">
              {data[0]?.sensorvalue || 'N/A'}
              <span className="text-lg ml-1">{config.unit}</span>
            </div>
          </div>
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2.5">Status</h4>
            <span className={`text-sm ${getSensorStatus(data[0]?.sensorvalue, type)[0]} px-2 py-1 rounded`}>
              {getSensorStatus(data[0]?.sensorvalue, type)[1]}
            </span>
          </div>
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2.5">Last Updated</h4>
            <div className="text-sm text-gray-900">
              {data[0]?.timestamp ? new Date(data[0].timestamp).toLocaleTimeString() : 'N/A'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-4">
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
            <div className={`text-2xl font-bold ${config.color}`}>
              {data[0]?.location || 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 shadow-md rounded-lg p-7">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">{config.title} Over Time</h4>
          <p className="text-gray-600 mb-6">24-hour tracking of {config.title.toLowerCase()}</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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
                <YAxis hide/>
                <Line 
                  type="monotone" 
                  dataKey="sensorvalue" 
                  stroke="#374151" 
                  strokeWidth={2}
                  dot={false}
                  fill="url(#gradient)"
                />
                <Tooltip 
                  formatter={(value, name) => {
                    const displayNames = {
                      sensorvalue: config.title
                    };
                    return [value, displayNames[name] || name];
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    });
                  }}
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
        </div>
      </div>
    );
  };

  // Alert Item
  const AlertItem = ({ message, alerttime }) => {
    return (
      <div className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 bg-yellow-50 border-l-4 border-yellow-400 animate-pulse">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="text-yellow-500" size={20} />
          <span className="text-sm font-medium text-gray-700">{message}</span>
        </div>
        <span className="text-xs text-gray-500"><TimeAgo date={alerttime}/></span>
      </div>
    );
  };

  // Split the environmental sensors into two chunks
  const environmentalSensors = Object.entries(sensorConfig.environmental).filter(
    ([sensorType]) => environmentalData[sensorType] && environmentalData[sensorType][0]
  );
  const firstRow = environmentalSensors.slice(0, 4);
  const secondRow = environmentalSensors.slice(4);

  const allSensors = [
    ...Object.entries(sensorConfig.environmental).map(([type, config]) => ({
      type,
      config,
      data: environmentalData[type]
    })),
    ...Object.entries(sensorConfig.structural).map(([type, config]) => ({
      type,
      config,
      data: structuralData[type]
    }))
  ];

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {firstRow.map(([sensorType, config]) => {
              const sensorData = environmentalData[sensorType];
              const IconComponent = config.icon;
              return (
                <button 
                  key={sensorType}
                  onClick={() => openModal(sensorType, sensorData, config)} 
                  className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`w-8 h-8 ${config.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{config.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-3">
                    {sensorData[0].sensorvalue}
                    <span className="text-lg">{config.unit}</span>
                  </div>
                  <span className={`text-sm ${getSensorStatus(sensorData[0].sensorvalue, sensorType)[0]} px-2 py-1 rounded`}>
                    {getSensorStatus(sensorData[0].sensorvalue, sensorType)[1]}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {secondRow.map(([sensorType, config]) => {
              const sensorData = environmentalData[sensorType];
              const IconComponent = config.icon;
              return (
                <button 
                  key={sensorType}
                  onClick={() => openModal(sensorType, sensorData, config)} 
                  className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`w-8 h-8 ${config.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{config.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-3">
                    {sensorData[0].sensorvalue}
                    <span className="text-lg">{config.unit}</span>
                  </div>
                  <span className={`text-sm ${getSensorStatus(sensorData[0].sensorvalue, sensorType)[0]} px-2 py-1 rounded`}>
                    {getSensorStatus(sensorData[0].sensorvalue, sensorType)[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structural Health Monitoring */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Structural Health Monitoring</h2>
            <p className="text-gray-600">Current values of structural health monitoring sensors</p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(sensorConfig.structural).map(([sensorType, config]) => {
              const sensorData = structuralData[sensorType];
              if (!sensorData || !sensorData[0]) return null;

              const IconComponent = config.icon;
              return (
                <button 
                  key={sensorType}
                  onClick={() => openModal(sensorType, sensorData, config)} 
                  className="text-center rounded-lg p-6 shadow-md transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`w-8 h-8 ${config.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{config.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-3">
                    {sensorData[0].sensorvalue}
                    <span className="text-lg">{config.unit}</span>
                  </div>
                  <span className={`text-sm ${getSensorStatus(sensorData[0].sensorvalue, sensorType)[0]} px-2 py-1 rounded`}>
                    {getSensorStatus(sensorData[0].sensorvalue, sensorType)[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-[#1d1d1dad]">
          <ClickAwayListener onClickAway={closeModal}>
            <div className="relative p-4 w-full max-w-5xl max-h-full">
              <div className="relative bg-[#ffffffc2] rounded-lg shadow-lg">
                {/* Close Button */}
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center z-10"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

                <ModelContent/>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}

      {/* Active Sensors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sensor Status</h2>
            <p className="text-gray-600">Details of currently active environmental sensors</p>
          </div>
          

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {allSensors
              .filter(sensor => sensor.data && sensor.data[0]) 
              .map(({ type, config, data }) => {
                const IconComponent = config.icon;
                const value = data[0].sensorvalue;
                const status = getSensorStatus(value, type); 

                return (
                  <div key={type} className="flex items-center justify-between space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{config.title}</h3>
                      </div>
                    </div>

                    <div className="text-right">
                      {data[0].state ? (
                        <button className="text-md text-green-800 font-semibold bg-green-50 p-3 rounded-full shadow">ON</button>
                      ) : (
                        <button className="text-md text-red-800 font-semibold bg-red-50 p-3 rounded-full shadow">OFF</button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-200 rounded-lg p-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-white mb-6">Recent Alerts</h2>
          <div className="space-y-4 overflow-y-auto max-h-[50vh] custom-scrollbar">
            {recentAlert && recentAlert.length > 0 ? (
              recentAlert.map((alert, index) => (
                <div
                  key={`${alert.alertid}-${alert.alerttime}-${index}`}
                >
                  <AlertItem {...alert}/>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No 24h Alerts Available</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartSensors;