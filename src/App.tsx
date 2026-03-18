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

type Page = 'home' | 'policies' | 'dashboard' | 'catalog' | 'links'

const PAGE_METADATA: Record<Page, { title: string, param: string }> = {
  home: { title: 'Início', param: 'inicio' },
  catalog: { title: 'Cardápio', param: 'cardapio' },
  links: { title: 'Links', param: 'links' },
  policies: { title: 'Políticas', param: 'politicas' },
  dashboard: { title: 'Painel', param: 'painel' }
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bia_lobo_auth') === 'true'
  })

  // Sync state FROM URL on mount and popstate
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const p = params.get('p')
      
      const foundPage = (Object.keys(PAGE_METADATA) as Page[]).find(
        key => PAGE_METADATA[key].param === p
      ) || (['home', 'policies', 'dashboard', 'catalog', 'links'].includes(p as any) ? p as Page : 'home')

      if (foundPage !== currentPage) {
        setCurrentPage(foundPage)
      }
    }

    syncFromUrl()
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [currentPage])

  // Sync URL AND Title FROM state
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage]
    document.title = `Bia Lobo | ${meta.title}`
    
    // Update URL without adding multiple history entries if already there
    const params = new URLSearchParams(window.location.search)
    if (params.get('p') !== meta.param) {
      const newUrl = meta.param === 'home' || meta.param === 'inicio' 
        ? window.location.pathname 
        : `${window.location.pathname}?p=${meta.param}`
      
      window.history.pushState({ page: currentPage }, '', newUrl)
    }

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
