import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeProvider'
import Landing from './pages/Landing'
import About from './pages/About'
import Work from './pages/Work'
import Expertise from './pages/Expertise'
import Contact from './pages/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}