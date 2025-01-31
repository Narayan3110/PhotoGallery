import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Footer from './components/Footer.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import NewHomePage from './pages/NewHomePage.jsx';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.auth.user); // Check if user is logged in

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<NewHomePage />} />
        
        {/* Protect Gallery Route */}
        <Route
          path='/gallery'
          element={user ? <GalleryPage /> : <Navigate to="/login" />}
        />

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
