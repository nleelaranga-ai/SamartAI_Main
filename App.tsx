import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { ScholarshipDiscoveryPage } from './pages/ScholarshipDiscoveryPage';
import { AiTechnologyPage } from './pages/AiTechnologyPage';
import { ImpactPage } from './pages/ImpactPage';
import { FutureRoadmapPage } from './pages/FutureRoadmapPage';
import { ContactPage } from './pages/ContactPage';
import { PageContainer } from './components/PageContainer';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<PageContainer><AboutPage /></PageContainer>} />
              <Route path="/how-it-works" element={<PageContainer><HowItWorksPage /></PageContainer>} />
              <Route path="/features" element={<PageContainer><FeaturesPage /></PageContainer>} />
              <Route path="/discover" element={<ScholarshipDiscoveryPage />} />
              <Route path="/ai-technology" element={<PageContainer><AiTechnologyPage /></PageContainer>} />
              <Route path="/impact" element={<PageContainer><ImpactPage /></PageContainer>} />
              <Route path="/roadmap" element={<PageContainer><FutureRoadmapPage /></PageContainer>} />
              <Route path="/contact" element={<PageContainer><ContactPage /></PageContainer>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </HashRouter>
  );
}

export default App;
