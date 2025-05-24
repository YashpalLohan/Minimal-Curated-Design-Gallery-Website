import Gallery from './components/Gallery/Gallery'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}

export default App
