import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Cours from '../components/Cours'
import WhySection from '../components/WhySection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Cours />
      <Pricing />
       <WhySection />
      <Footer />
     
    </div>
  )
}

export default Home