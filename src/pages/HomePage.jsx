import CategorySection from '../components/home/CategorySection'
import CTABanner from '../components/home/CTABanner'
import FeaturedJobs from '../components/home/FeaturedJobs'
import Footer from '../components/home/Footer'
import Hero from '../components/home/Hero'
import LatestJobs from '../components/home/LatestJobs'
import Navbar from '../components/layout/Navbar'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <CategorySection/>
      <FeaturedJobs/>
      <CTABanner/>
      <LatestJobs/>
      <Footer/>
    
    </div>
  )
}

export default HomePage