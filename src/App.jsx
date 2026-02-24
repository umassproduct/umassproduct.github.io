import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Showcase from './pages/Showcase/Showcase'
import ForStudents from './pages/ForStudents/ForStudents'
import ForFounders from './pages/ForFounders/ForFounders'
import WhoWeAre from './pages/WhoWeAre/WhoWeAre'
import Portal from './pages/Portal/Portal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/students" element={<ForStudents />} />
          <Route path="/founders" element={<ForFounders />} />
          <Route path="/about" element={<WhoWeAre />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App
