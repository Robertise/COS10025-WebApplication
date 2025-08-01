import { useState, useEffect } from "react";

export const GetTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-gray-600">{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}</span>
  );
};



// Get the sensor status based on the value
export const getSensorStatus = (data, type) => {
  switch (type.toLowerCase()) {
    case 'temp':
      switch (true) {
        case (data < 10):
          return ["bg-blue-300 text-blue-900", "Cold"];
        case (data >= 10 && data <= 25):
          return ["bg-green-200 text-green-900", "Stable"];
        case (data > 25 && data <= 30):
          return ["bg-yellow-200 text-yellow-900", "Warm"];
        case (data > 30 && data <= 35):
          return ["bg-orange-200 text-orange-900", "Warning"];
        default:
          return ["bg-red-200 text-red-900", "Critical"];
      }

    case 'hum':
      switch (true) {
        case (data < 30):
          return ["bg-orange-200 text-orange-900", "Dry"];
        case (data >= 30 && data <= 40):
          return ["bg-green-200 text-green-900", "Stable"];
        case (data > 40 && data <= 50):
          return ["bg-green-200 text-green-900", "Good"];
        case (data > 50 && data <= 60):
          return ["bg-orange-200 text-orange-900", "Warning"];
        default:
          return ["bg-red-200 text-red-900", "High"];
      }

    case 'air':
      switch (true) {
        case (data <= 50):
          return ["bg-green-200 text-green-900", "Good"];
        case (data <= 100):
          return ["bg-yellow-200 text-yellow-900", "Moderate"];
        case (data <= 150):
          return ["bg-green-200 text-green-900", "Stable"];
        case (data <= 200):
          return ["bg-red-200 text-red-900", "Unhealthy"];
        case (data <= 300):
          return ["bg-red-300 text-red-950", "Very Unhealthy"];
        default:
          return ["bg-red-400 text-red-950", "Hazardous"];
      }

    case 'wind':
      switch (true) {
        case (data < 2):
          return ["bg-green-200 text-green-900", "Calm"];
        case (data >= 2 && data <= 5):
          return ["bg-green-200 text-green-900", "Light"];
        case (data > 5 && data <= 10):
          return ["bg-yellow-200 text-yellow-900", "Moderate"];
        case (data > 10 && data <= 15):
          return ["bg-orange-200 text-orange-900", "Fresh"];
        case (data > 15 && data <= 20):
          return ["bg-red-200 text-red-900", "Strong"];
        default:
          return ["bg-red-300 text-red-950", "Very Strong"];
      }

    case 'light':
      switch (true) {
        case (data < 200):
          return ["bg-gray-400 text-gray-950", "Dark"];
        case (data >= 200 && data <= 500):
          return ["bg-gray-200 text-gray-900", "Dim"];
        case (data > 500 && data <= 1000):
          return ["bg-green-200 text-green-900", "Normal"];
        case (data > 1000 && data <= 2000):
          return ["bg-green-200 text-green-900", "Good"];
        case (data > 2000 && data <= 5000):
          return ["bg-yellow-200 text-yellow-900", "Bright"];
        default:
          return ["bg-yellow-300 text-yellow-900", "Very Bright"];
      }

    case 'rain':
      switch (true) {
        case (data === 0):
          return ["bg-green-200 text-green-900", "No Rain"];
        case (data > 0 && data <= 2.5):
          return ["bg-blue-200 text-blue-900", "Light"];
        case (data > 2.5 && data <= 10):
          return ["bg-blue-300 text-blue-950", "Moderate"];
        case (data > 10 && data <= 50):
          return ["bg-red-200 text-red-900", "Heavy"];
        default:
          return ["bg-red-300 text-red-950", "Very Heavy"];
      }

    case 'vibration':
      switch (true) {
        case (data < 1):
          return ["bg-green-200 text-green-900", "Safe"];
        case (data >= 1 && data <= 3):
          return ["bg-green-200 text-green-900", "Normal"];
        case (data > 3 && data <= 5):
          return ["bg-yellow-200 text-yellow-900", "Moderate"];
        case (data > 5 && data <= 8):
          return ["bg-orange-200 text-orange-900", "Warning"];
        default:
          return ["bg-red-200 text-red-900", "Critical"];
      }

    case 'strain_gauge':
      switch (true) {
        case (data >= -10 && data <= 10):
          return ["bg-green-200 text-green-900", "Normal"];
        case ((data > 10 && data <= 50) || (data >= -50 && data < -10)):
          return ["bg-yellow-200 text-yellow-900", "Slight Stretching"];
        case ((data > 50 && data <= 100) || (data >= -100 && data < -50)):
          return ["bg-orange-200 text-orange-900", "Moderate"];
        case ((data > 100 && data <= 200) || (data >= -200 && data < -100)):
          return ["bg-red-200 text-red-900", "Warning"];
        default:
          return ["bg-red-300 text-red-950", "Critical"];
      }

    case 'tiltmeter':
      switch (true) {
        case (Math.abs(data) <= 0.05):
          return ["bg-green-200 text-green-900", "Stable"];
        case (Math.abs(data) > 0.05 && Math.abs(data) <= 0.1):
          return ["bg-yellow-200 text-yellow-900", "Slight"];
        case (Math.abs(data) > 0.1 && Math.abs(data) <= 0.2):
          return ["bg-orange-200 text-orange-900", "Moderate"];
        case (Math.abs(data) > 0.2 && Math.abs(data) <= 0.5):
          return ["bg-red-200 text-red-900", "Warning"];
        default:
          return ["bg-red-300 text-red-950", "Urgent"];
      }

    case 'acoustic_emission':
      switch (true) {
        case (data < 10):
          return ["bg-green-200 text-green-900", "Low"];
        case (data >= 10 && data <= 20):
          return ["bg-green-200 text-green-900", "Normal"];
        case (data > 20 && data <= 40):
          return ["bg-yellow-200 text-yellow-900", "Medium"];
        case (data > 40 && data <= 60):
          return ["bg-orange-200 text-orange-900", "High"];
        default:
          return ["bg-red-200 text-red-900", "Very High"];
      }

    default:
      return ["bg-green-200 text-green-900", "Normal"];
  }
}
