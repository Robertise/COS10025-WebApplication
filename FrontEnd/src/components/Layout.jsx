import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="bg-white min-h-screen h-screen w-screen overflow-x-auto custom-scrollbar">
      <Header/>
      <Outlet/> 
      <Footer/> 
    </div>
  );
};

export default Layout;