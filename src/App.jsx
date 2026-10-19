import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  )
}