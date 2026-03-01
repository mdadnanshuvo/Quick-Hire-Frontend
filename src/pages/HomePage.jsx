import Hero from '../components/home/Hero'
import Navbar from '../components/layout/Navbar'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <h1 style={{ padding: '40px', color: '#4F46E5' }}>Home Page</h1>
    </div>
  )
}

export default HomePage