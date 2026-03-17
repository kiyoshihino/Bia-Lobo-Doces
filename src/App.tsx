import { useState, useEffect } from 'react'
import type { Product } from './hooks/useCatalog'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Catalog from './components/Catalog'
import CategoryShowcase from './components/CategoryShowcase'
import ProductModal from './components/ProductModal'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Policies from './components/Policies'
import Dashboard from './components/Dashboard'
import BioLinks from './components/BioLinks'
import Login from './components/Login'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'policies' | 'dashboard' | 'catalog' | 'links'>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bia_lobo_auth') === 'true'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('p')
    if (p && ['home', 'policies', 'dashboard', 'catalog', 'links'].includes(p)) {
      setCurrentPage(p as any)
      // Clean up the URL without reloading
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, []) // Run only on initial mount

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  if (currentPage === 'dashboard') {
    if (!isAuthenticated) {
      return <Login onLogin={() => setIsAuthenticated(true)} />
    }
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

  if (currentPage === 'links') {
    return <BioLinks onNavigate={setCurrentPage} />
  }

  if (currentPage === 'catalog') {
    return (
      <div className="min-h-screen">
        <Navbar onNavigate={(page) => {
          if (page === 'catalog') setSelectedCategory('Todos')
          setCurrentPage(page)
        }} isPoliciesPage={true} />
        <Catalog 
          initialCategory={selectedCategory}
          onSelectProduct={(p: Product) => {
            setSelectedProduct(p)
          }} 
        />
        <Footer onNavigate={setCurrentPage} />
        
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    )
  }


  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} isPoliciesPage={false} />
      <Hero onNavigate={setCurrentPage} />
      <About />
      <CategoryShowcase onSelectCategory={(cat) => {
        setSelectedCategory(cat)
        setCurrentPage('catalog')
      }} />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer onNavigate={setCurrentPage} />
      
      {/* Global Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  )
}

export default App
