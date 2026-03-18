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

const PAGE_METADATA: Record<Page, { title: string, path: string }> = {
  home: { title: 'Início', path: '' },
  catalog: { title: 'Cardápio', path: 'cardapio' },
  links: { title: 'Links', path: 'links' },
  policies: { title: 'Políticas', path: 'politicas' },
  dashboard: { title: 'Painel', path: 'painel' }
}

function App() {
  // 1. Initialize state directly from URL path or param
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '')
    const params = new URLSearchParams(window.location.search)
    const p = params.get('p')
    
    // Check path first, then param
    const foundByPath = (Object.keys(PAGE_METADATA) as Page[]).find(
      key => PAGE_METADATA[key].path === path && path !== ''
    )
    if (foundByPath) return foundByPath

    const foundByParam = (Object.keys(PAGE_METADATA) as Page[]).find(
      key => PAGE_METADATA[key].path === p
    )
    if (foundByParam) return foundByParam

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
        const path = window.location.pathname.replace(/^\/|\/$/g, '')
        const params = new URLSearchParams(window.location.search)
        const p = params.get('p')
        
        const foundPage = (Object.keys(PAGE_METADATA) as Page[]).find(
          key => PAGE_METADATA[key].path === path || PAGE_METADATA[key].path === p
        ) || 'home'
        
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
    
    const path = window.location.pathname.replace(/^\/|\/$/g, '')
    const targetPath = meta.path
    
    // Only update history if the current URL path doesn't match the intended page
    if (path !== targetPath) {
      const newUrl = targetPath === '' ? '/' : `/${targetPath}`
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
