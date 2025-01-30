import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
// import HomePage from './pages/HomePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Footer from './components/Footer.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import NewHomePage from './pages/NewHomePage.jsx';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<NewHomePage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
