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
  // 1. Initialize state directly from URL to avoid initial mount flicker
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('p')
    const foundPage = (Object.keys(PAGE_METADATA) as Page[]).find(
      key => PAGE_METADATA[key].param === p
    )
    if (foundPage) return foundPage
    if (['home', 'policies', 'dashboard', 'catalog', 'links'].includes(p as any)) return p as Page
    return 'home'
  })

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bia_lobo_auth') === 'true'
  })

  // 2. Sync state FROM URL on POPSTATE (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const pageFromState = e.state?.page as Page
      if (pageFromState && PAGE_METADATA[pageFromState]) {
        setCurrentPage(pageFromState)
      } else {
        const params = new URLSearchParams(window.location.search)
        const p = params.get('p')
        const foundPage = (Object.keys(PAGE_METADATA) as Page[]).find(
          key => PAGE_METADATA[key].param === p
        ) || (['home', 'policies', 'dashboard', 'catalog', 'links'].includes(p as any) ? p as Page : 'home')
        setCurrentPage(foundPage)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 3. Sync URL AND Title FROM state
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage]
    document.title = `Bia Lobo | ${meta.title}`
    
    const params = new URLSearchParams(window.location.search)
    const currentParam = params.get('p')
    const targetParam = meta.param
    
    // Only update history if the current URL doesn't match the intended page
    // and this isn't the initial load (where they already match)
    if (currentParam !== targetParam) {
      if (currentPage === 'home' && !currentParam) {
        // Already at home base URL, no need to push
      } else {
        const newUrl = targetParam === 'inicio' ? window.location.pathname : `?p=${targetParam}`
        window.history.pushState({ page: currentPage }, '', newUrl)
      }
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
