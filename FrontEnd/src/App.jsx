import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import ARVRTechnology from './pages/ARVR-Technology';
import SmartSensors from './pages/SmartSensors';
import About from './pages/About';


const App = () => {
  return (
    <Router>
      <Routes>    
        <Route path="/" element={<Layout/>}>
          <Route index element={<ARVRTechnology/>}/>
          <Route path="smartsensors" element={<SmartSensors/>}/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
    </Router>
  )
};

export default App;