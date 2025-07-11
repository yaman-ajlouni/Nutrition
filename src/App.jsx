import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import FAQ from './pages/landingPage/faq/FAQ'
import Features from './pages/landingPage/features/Features'
import FinalCTA from './pages/landingPage/finalCTA/FinalCTA'
import HowItWorks from './pages/landingPage/howItWorks/HowItWorks'
import Intro from './pages/landingPage/intro/Intro'
import Pricing from './pages/landingPage/pricing/Pricing'

function App() {

  return (
    <>
      <Navbar />
      <Intro />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}

export default App
