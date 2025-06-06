// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CommitteePage from './pages/AboutPage';
import FacultyPage from './pages/AboutPage';
import AbstractPage from './pages/AboutPage';
import BrochurePage from './pages/AboutPage';
import ContactPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage  from './pages/UploadPage';
import DropboxViewerPage  from './pages/DropboxViewer';
import OAuthCallback from './pages/OAuthCallback'; // Component to handle access_token


function App() {
  return (
    <Router>
       <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutPage />} />
        <Route path="/Committee" element={<CommitteePage />} />
        <Route path="/Faculty" element={<FacultyPage />} />
        <Route path="/Abstract" element={<UploadPage />} />
        <Route path="/Brochure" element={<BrochurePage />} />
        <Route path="/Contact us" element={<ContactPage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/ViewAbstracts" element={<DropboxViewerPage />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/star-app/oauth-callback" element={<OAuthCallback />} />
      </Routes>
       <Footer />
    </Router>
  );
}

export default App;
