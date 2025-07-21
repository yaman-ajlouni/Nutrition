import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import FAQ from './pages/landingPage/faq/FAQ'
import Features from './pages/landingPage/features/Features'
import FinalCTA from './pages/landingPage/finalCTA/FinalCTA'
import HowItWorks from './pages/landingPage/howItWorks/HowItWorks'
import Intro from './pages/landingPage/intro/Intro'
import Pricing from './pages/landingPage/pricing/Pricing'
import LabelGenerator from './pages/labelGenerator/LabelGenerator'
import { LanguageProvider } from './context/LanguageContext'

// Landing Page Component
const LandingPage = () => {
  return (
    <>
      <Intro />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />

            {/* Label Generator Route */}
            <Route path="/label-generator" element={<LabelGenerator />} />

            {/* Individual section routes (optional - for direct linking) */}
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Placeholder routes for future pages */}
            <Route path="/calculator" element={<LabelGenerator />} />
            <Route path="/database" element={<div className="page-placeholder">Database Page Coming Soon</div>} />
            <Route path="/reports" element={<div className="page-placeholder">Reports Page Coming Soon</div>} />
            <Route path="/services" element={<div className="page-placeholder">Services Page Coming Soon</div>} />
            <Route path="/about" element={<div className="page-placeholder">About Page Coming Soon</div>} />
            <Route path="/contact" element={<div className="page-placeholder">Contact Page Coming Soon</div>} />

            {/* 404 Route */}
            <Route path="*" element={<div className="page-placeholder">Page Not Found</div>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App