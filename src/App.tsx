import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Catalog from './components/Catalog'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Policies from './components/Policies'
import Dashboard from './components/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'policies' | 'dashboard'>('home')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  if (currentPage === 'dashboard') {
    return <Dashboard onBack={() => setCurrentPage('home')} />
  }

  if (currentPage === 'policies') {
    return (
      <div className="min-h-screen">
        <Navbar onNavigate={setCurrentPage} isPoliciesPage={true} />
        <Policies onBack={() => setCurrentPage('home')} />
        <Footer onNavigate={setCurrentPage} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} isPoliciesPage={false} />
      <Hero />
      <About />
      <Catalog />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}

export default App
