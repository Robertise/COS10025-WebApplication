import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#dc2c26]">Swin</span>
            <span className="text-2xl font-bold text-gray-900">{isActive('/') ? 'Tour' : isActive('/smartsensors') ? 'Sensor' : 'Us'}</span>
          </div>
          <nav className="flex space-x-8">
            <a href="/" className={`font-medium ${
                isActive('/') 
                  ? 'text-[#dc2c26]' 
                  : 'text-gray-900 hover:text-[#dc2c26]'
              }`}>AR/VR Technology</a>
            <a href="/smartsensors" className={`font-medium ${
                isActive('/smartsensors') 
                  ? 'text-[#dc2c26]' 
                  : 'text-gray-900 hover:text-[#dc2c26]'
              }`}>Smart Sensors</a>
            <a href="/about" className={`font-medium ${
                isActive('/about') 
                  ? 'text-[#dc2c26]' 
                  : 'text-gray-900 hover:text-[#dc2c26]'
              }`}>About us</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;