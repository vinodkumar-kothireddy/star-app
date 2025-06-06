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
        <Route path="/star-app" element={<HomePage />} />
        <Route path="/star-app/AboutUs" element={<AboutPage />} />
        <Route path="/star-app/Committee" element={<CommitteePage />} />
        <Route path="/star-app/Faculty" element={<FacultyPage />} />
        <Route path="/star-app/Abstract" element={<UploadPage />} />
        <Route path="/star-app/Brochure" element={<BrochurePage />} />
        <Route path="/star-app/Contact us" element={<ContactPage />} />
       <Route path="/star-app/register" element={<RegisterPage />} />
       <Route path="/star-app/ViewAbstracts" element={<DropboxViewerPage />} />
        <Route path="/star-app/oauth-callback" element={<OAuthCallback />} />
      </Routes>
       <Footer />
    </Router>
  );
}

export default App;
