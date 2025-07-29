import React, { useEffect, useState, useRef } from 'react';
import TrueFocus from '../effects/TrueFocus';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';



const ARVR = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); 

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Vietnamese', code: 'vn' },
    { name: 'French', code: 'fr' }
  ];

  // Complete translation system
  const translations = {
    en: {
      hero: {
        title: 'Welcome to Swinburne VN',
        vrTour: 'VR360 Tour',
        selectLanguage: 'Select Language'
      },
      about: {
        title: 'About this Tour',
        description: 'This is a simple 360-degree experience of a part of the course COS10025 - Technology in an Indigenous Context Project, created to demonstrate how VR can be used in heritage or educational projects with a minimal cost.'
      },
      howItWorks: {
        title: 'How it Works',
        subtitle: 'Follow these simple steps to enjoy the tour.',
        steps: [
          { title: 'Step 1', description: 'Open the tour below.' },
          { title: 'Step 2', description: 'Look around.' },
          { title: 'Step 3', description: 'Learn about the place.' },
          { title: 'Step 4', description: 'Move to the next place.' }
        ]
      },
      vrExperience: {
        description: 'This is a simple 360-degree experience of selected parts of the university, demonstrating the potential of VR in education.'
      },
      map: {
        title: 'Position map of',
        location: 'Swinburne'
      }
    },
    vn: {
      hero: {
        title: 'Chào mừng đến với Swinburne VN',
        vrTour: 'Tour VR360',
        selectLanguage: 'Chọn Ngôn Ngữ'
      },
      about: {
        title: 'Về Tour Này',
        description: 'Đây là một trải nghiệm VR360 độ đơn giản và là một phần khóa học COS10025 - Dự án Công nghệ trong Bối cảnh Bản địa, được tạo ra để chứng minh cách VR có thể được sử dụng trong các dự án di sản hoặc giáo dục với chi phí tối thiểu.'
      },
      howItWorks: {
        title: 'Cách Hoạt Động',
        subtitle: 'Thực hiện theo các bước đơn giản này để tận hưởng tour.',
        steps: [
          { title: 'Bước 1', description: 'Mở tour bên dưới.' },
          { title: 'Bước 2', description: 'Nhìn xung quanh.' },
          { title: 'Bước 3', description: 'Tìm hiểu về địa điểm.' },
          { title: 'Bước 4', description: 'Chuyển đến địa điểm tiếp theo.' }
        ]
      },
      vrExperience: {
        description: 'Đây là một trải nghiệm 360 độ đơn giản của các phần được chọn của trường đại học, chứng minh tiềm năng của VR trong giáo dục.'
      },
      map: {
        title: 'Bản đồ vị trí của',
        location: 'Swinburne'
      }
    },
    fr: {
      hero: {
        title: 'Bienvenue à Swinburne VN',
        vrTour: 'Tour VR360',
        selectLanguage: 'Sélectionner la Langue'
      },
      about: {
        title: 'À propos de ce Tour',
        description: 'Il s\'agit d\'une expérience simple à 360 degrés d\'une partie du cours COS10025 - Projet Technologie dans un Contexte Indigène, créée pour démontrer comment la RV peut être utilisée dans des projets patrimoniaux ou éducatifs à coût minimal.'
      },
      howItWorks: {
        title: 'Comment ça Marche',
        subtitle: 'Suivez ces étapes simples pour profiter du tour.',
        steps: [
          { title: 'Étape 1', description: 'Ouvrez le tour ci-dessous.' },
          { title: 'Étape 2', description: 'Regardez autour de vous.' },
          { title: 'Étape 3', description: 'Apprenez sur le lieu.' },
          { title: 'Étape 4', description: 'Passez au lieu suivant.' }
        ]
      },
      vrExperience: {
        description: 'Il s\'agit d\'une expérience simple à 360 degrés de parties sélectionnées de l\'université, démontrant le potentiel de la RV dans l\'éducation.'
      },
      map: {
        title: 'Carte Interactive de',
        location: 'Swinburne'
      }
    }
  };

  // Get current translations
  const t = translations[selectedLanguage];

  // Set Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    if (mapRef.current) {
      return;
    }

    const lat = 10.81628755616019;
    const lng = 106.66900645099533;

    const map = L.map(container, {
      center: [lat, lng],
      zoom: 14
    });

    L.tileLayer('https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=jYVPVC3Ux6KWIgoR3U7X', {
      minZoom: 14,
      maxZoom: 17,
      attribution: '&copy; MapTiler & OpenStreetMap contributors',
    }).addTo(map);

    const swinburneLogo = L.icon({
      iconUrl: '/swinburne_rect.jpg',
      iconSize: [64, 32],
    });

    const marker = L
      .marker([lat, lng],  { icon: swinburneLogo })
      .addTo(map)
      .bindPopup(`
        <b>Swinburne University, HCMC</b><br/>
        <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      `);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);



  return (
    <div>
      {/* Hero Section */}
      <section className="py-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
            <TrueFocus 
              sentence={t.hero.vrTour}
              manualMode={false}
              blurAmount={3}
              borderColor="#dc2c26"
              animationDuration={1}
              pauseBetweenAnimations={1}
              />
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-800 font-medium mb-6">{t.hero.selectLanguage}</p>
            <div className="flex justify-center space-x-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    selectedLanguage === lang.code
                      ? 'bg-[#dc2c26] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.about.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {t.about.description}
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.howItWorks.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{t.howItWorks.subtitle}</p>
            </div>
            <div className="space-y-6">
              {t.howItWorks.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VR Experience Section */}
      <section className="py-20 bg-gray-100 aspect-video flex items-center justify-center">
        <div>
          <div className="border-2 rounded-lg w-[1080px] h-[700px]">
            <iframe
              src="/app-files/index.html"
              title="VR Tour"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            {t.map.title} {t.map.location}
          </h2>
          <div className="relative">
            <div 
              ref={mapContainerRef}
              className="bg-gray-200 rounded-lg aspect-video w-full h-96"
              style={{ minHeight: '400px' }}
            >
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ARVR;