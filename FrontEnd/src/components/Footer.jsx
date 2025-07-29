import { useLocation } from 'react-router-dom';
import TextPressure from '../effects/TextPressure';

const Footer = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <footer className="bg-black">
        <div style={{position: 'relative', height: '330px'}}>
          <TextPressure
            text="SWINBURNE"
            flex={false}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="#ffffff"
            strokeColor="#ff0800"
            minFontSize={30}
          />
        </div>
      </footer>
      <footer className="bg-black py-8 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© 2025 Do Gia Huy. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/" className={`${
                  isActive('/') 
                    ? 'text-[#dc2c26]' 
                    : 'text-gray-400 hover:text-[#dc2c26]'
                }`}>AR/VR Technology</a>
              <a href="/smartsensors" className={`${
                  isActive('/smartsensors') 
                    ? 'text-[#dc2c26]' 
                    : 'text-gray-400 hover:text-[#dc2c26]'
                }`}>Smart Sensors</a>
              <a href="/about" className={`${
                  isActive('/about') 
                    ? 'text-[#dc2c26]' 
                    : 'text-gray-400 hover:text-[#dc2c26]'
                }`}>About us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;