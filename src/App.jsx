import './App.css'
import Navbar from './components/navbar/Navbar'
import FAQ from './pages/landingPage/faq/FAQ'
import Features from './pages/landingPage/features/Features'
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
    </>
  )
}

export default App
