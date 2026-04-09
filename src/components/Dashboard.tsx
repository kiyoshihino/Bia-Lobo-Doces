import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Edit2, Trash2, Save, 
  LayoutDashboard, ArrowLeft, Building2, ShoppingBag, 
  Layers, Menu, X
} from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'
import type { Product, Category, CompanyProfile } from '../hooks/useCatalog'

interface DashboardProps {
  onBack: () => void
}

type Tab = 'profile' | 'products' | 'categories'

export default function Dashboard({ onBack }: DashboardProps) {
  const { 
    profile, updateProfile, 
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory 
  } = useCatalog()
  
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [productView, setProductView] = useState<'list' | 'add' | 'edit'>('list')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  // Forms state
  const [profileForm, setProfileForm] = useState<CompanyProfile>(profile)
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: categories[0]?.name || 'Docinhos',
    tags: []
  })
  const [categoryForm, setCategoryForm] = useState<Omit<Category, 'id'>>({
    name: '',
    image: ''
  })

  // Utility: Convert File to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('A imagem é muito grande. Por favor, escolha uma imagem com menos de 2MB.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        callback(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handlers
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileForm)
    alert('Perfil atualizado com sucesso!')
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (productView === 'edit' && editingProduct) {
      updateProduct(editingProduct.id, productForm)
    } else {
      addProduct(productForm)
    }
    setProductView('list')
    setEditingProduct(null)
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryForm)
    } else {
      addCategory(categoryForm)
    }
    setIsCategoryModalOpen(false)
    setEditingCategory(null)
  }

  const navigation = [
    { id: 'profile', icon: Building2, label: 'Perfil' },
    { id: 'products', icon: ShoppingBag, label: 'Produtos' },
    { id: 'categories', icon: Layers, label: 'Categorias' }
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fdfcfe', 
      display: 'flex',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: 'var(--brown)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(61, 35, 20, 0.2)',
          cursor: 'pointer'
        }}
        className="mobile-only"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '0px',
          x: isSidebarOpen ? 0 : -280
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{ 
          backgroundColor: 'var(--brown)', 
          color: 'white', 
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 900,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '10px 0 30px rgba(0,0,0,0.05)'
        }}
        className="sidebar-responsive"
      >
        <div style={{ padding: '40px 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              backgroundColor: 'var(--blush)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <LayoutDashboard size={22} color="var(--brown)" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Bia Lobo</h1>
              <p style={{ fontSize: '10px', opacity: 0.6, margin: 0, textTransform: 'uppercase', fontWeight: 700 }}>Painel Administrativo</p>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab)
                  if (window.innerWidth < 768) setIsSidebarOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeTab === item.id ? 'var(--blush)' : 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="active-nav"
                    style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--blush)' }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={onBack}
            style={{ 
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '14px 16px', 
              borderRadius: '14px', 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              border: 'none', 
              color: 'white', 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '10px'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
          >
            <ArrowLeft size={18} />
            <span>Voltar ao Site</span>
          </button>

          <button 
            onClick={() => {
              localStorage.removeItem('bia_lobo_auth')
              window.location.reload()
            }}
            style={{ 
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '14px 16px', 
              borderRadius: '14px', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              border: 'none', 
              color: '#fee2e2', 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
          >
            <X size={18} />
            <span>Sair do Painel</span>
          </button>

        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        padding: '40px clamp(20px, 5vw, 60px)',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} className="main-content-dashboard">
        
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <div>
              <p style={{ color: 'var(--rose)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Gerenciamento
              </p>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--brown)', margin: 0, letterSpacing: '-1px' }}>
                {navigation.find(n => n.id === activeTab)?.label}
              </h2>
            </div>
            
            {activeTab === 'products' && productView === 'list' && (
              <button 
                onClick={() => { setProductView('add'); setEditingProduct(null); setProductForm({ name: '', description: '', price: 0, image: '', category: categories[0]?.name || '', tags: [] }) }}
                style={{ 
                  backgroundColor: 'var(--brown)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '14px', 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(61, 35, 20, 0.15)'
                }}
              >
                <Plus size={20} /> Novo Produto
              </button>
            )}

            {activeTab === 'categories' && (
              <button 
                onClick={() => { setIsCategoryModalOpen(true); setEditingCategory(null); setCategoryForm({ name: '', image: '' }) }}
                style={{ 
                  backgroundColor: 'var(--brown)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '14px', 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(61, 35, 20, 0.15)'
                }}
              >
                <Plus size={20} /> Nova Categoria
              </button>
            )}
          </header>

          <AnimatePresence mode="wait">
            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <section style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '32px', 
                  padding: 'clamp(24px, 5vw, 48px)', 
                  boxShadow: '0 20px 50px rgba(61, 35, 20, 0.04)',
                  border: '1px solid rgba(0,0,0,0.02)'
                }}>
                  <form onSubmit={handleProfileSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brown)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '18px', backgroundColor: 'var(--rose)', borderRadius: '4px' }}></span>
                        Dados Institucionais
                      </h3>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nome da Empresa</label>
                      <input 
                        type="text" 
                        value={profileForm.name} 
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp (DDI+DDD+NÚMERO)</label>
                      <input 
                        type="text" 
                        value={profileForm.whatsapp} 
                        placeholder="Ex: 5561992590209"
                        onChange={e => setProfileForm({...profileForm, whatsapp: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', fontSize: '15px' }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Endereço Completo</label>
                      <input 
                        type="text" 
                        value={profileForm.address} 
                        onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', fontSize: '15px' }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bio / Sobre a Empresa</label>
                      <textarea 
                        rows={5}
                        value={profileForm.bio} 
                        onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', resize: 'none', fontSize: '15px', lineHeight: 1.6 }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brown)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '18px', backgroundColor: 'var(--gold)', borderRadius: '4px' }}></span>
                        Redes Sociais
                      </h3>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instagram (usuário)</label>
                      <input 
                        type="text" 
                        value={profileForm.instagram} 
                        onChange={e => setProfileForm({...profileForm, instagram: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logo da Empresa</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {profileForm.logo && (profileForm.logo.startsWith('/') || profileForm.logo.startsWith('./') || profileForm.logo.startsWith('http') || profileForm.logo.startsWith('data:')) && (
                          <img src={profileForm.logo} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                        )}
                        <label style={{ 
                          flex: 1, 
                          padding: '16px 20px', 
                          borderRadius: '16px', 
                          border: '2px dashed #edf2f7', 
                          backgroundColor: '#f8fafc', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          color: '#64748b',
                          fontSize: '14px',
                          fontWeight: 600
                        }}>
                          <Plus size={20} /> Carregar Imagem
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => handleFileUpload(e, (base64) => setProfileForm({...profileForm, logo: base64}))}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
                      <input 
                        type="email" 
                        value={profileForm.email} 
                        onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', fontSize: '15px' }}
                      />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" style={{ backgroundColor: 'var(--brown)', color: 'white', padding: '18px 40px', borderRadius: '18px', border: 'none', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(61, 35, 20, 0.15)' }}>
                        <Save size={20} /> Atualizar Perfil
                      </button>
                    </div>
                  </form>
                </section>

              </motion.div>
            )}


            {/* Tab: Products */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {productView === 'list' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                    {products.map(product => (
                      <div key={product.id} style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '24px', 
                        overflow: 'hidden', 
                        boxShadow: '0 10px 40px rgba(61, 35, 20, 0.04)',
                        border: '1px solid rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s',
                      }} className="dashboard-card">
                        <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                            <button onClick={() => { setEditingProduct(product); setProductForm(product); setProductView('edit'); }} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brown)', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}><Edit2 size={18} /></button>
                            <button onClick={() => deleteProduct(product.id)} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fee2e2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)' }}><Trash2 size={18} /></button>
                          </div>
                        </div>
                        <div style={{ padding: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brown)', margin: 0 }}>{product.name}</h3>
                            <span style={{ color: 'var(--rose)', fontWeight: 800, fontSize: '18px' }}>R${product.price.toFixed(2)}</span>
                          </div>
                          <p style={{ fontSize: '14px', color: 'var(--brown-mid)', marginBottom: '20px', lineHeight: 1.5, height: '42px', overflow: 'hidden' }}>{product.description}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--gold)', backgroundColor: 'var(--cream)', padding: '6px 12px', borderRadius: '10px', letterSpacing: '0.5px' }}>{product.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(productView === 'add' || productView === 'edit') && (
                  <section style={{ backgroundColor: 'white', borderRadius: '32px', padding: 'clamp(24px, 5vw, 48px)', boxShadow: '0 20px 50px rgba(61, 35, 20, 0.04)', maxWidth: '800px' }}>
                    <form onSubmit={handleProductSubmit} style={{ display: 'grid', gap: '32px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Nome do Produto</label>
                          <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Preço (R$)</label>
                          <input type="number" step="0.01" required value={productForm.price} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none' }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Categoria</label>
                        <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', cursor: 'pointer' }}>
                          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Descrição</label>
                        <textarea rows={4} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none', resize: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Foto do Produto</label>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          {productForm.image && <img src={productForm.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} />}
                          <label style={{ 
                            flex: 1, 
                            padding: '16px 20px', 
                            borderRadius: '16px', 
                            border: '2px dashed #edf2f7', 
                            backgroundColor: '#f8fafc', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            color: '#64748b',
                            fontSize: '14px',
                            fontWeight: 600
                          }}>
                            <Plus size={20} /> Escolher Arquivo
                            <input 
                              type="file" 
                              accept="image/*"
                              required={!productForm.image}
                              onChange={e => handleFileUpload(e, (base64) => setProductForm({...productForm, image: base64}))}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        <button type="submit" style={{ backgroundColor: 'var(--brown)', color: 'white', padding: '18px 40px', borderRadius: '18px', border: 'none', fontWeight: 800, cursor: 'pointer', flex: 1 }}>Salvar Produto</button>
                        <button type="button" onClick={() => setProductView('list')} style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '18px 40px', borderRadius: '18px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Cancelar</button>
                      </div>
                    </form>
                  </section>
                )}
              </motion.div>
            )}

            {/* Tab: Categories */}
            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {categories.map(cat => (
                    <div key={cat.id} style={{ 
                      backgroundColor: 'white', 
                      borderRadius: '24px', 
                      padding: '20px', 
                      boxShadow: '0 10px 40px rgba(61, 35, 20, 0.04)',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px',
                      border: '1px solid rgba(0,0,0,0.02)'
                    }} className="dashboard-card">
                      <div style={{ width: '70px', height: '70px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--brown)', margin: '0 0 4px 0' }}>{cat.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--brown-mid)', margin: 0, fontWeight: 500 }}>
                          {products.filter(p => p.category === cat.name).length} itens
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setIsCategoryModalOpen(true); }} style={{ width: '32px', height: '32px', borderRadius: '10px', border: 'none', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit2 size={16} /></button>
                        <button onClick={() => deleteCategory(cat.id)} style={{ width: '32px', height: '32px', borderRadius: '10px', border: 'none', backgroundColor: '#fee2e2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Plus card */}
                  <button 
                    onClick={() => { setIsCategoryModalOpen(true); setEditingCategory(null); setCategoryForm({ name: '', image: '' }) }}
                    style={{
                      borderRadius: '24px',
                      padding: '24px',
                      border: '2px dashed #edf2f7',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = 'var(--rose)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#edf2f7' }}
                  >
                    <Plus size={32} color="var(--brown-mid)" />
                    <span style={{ fontWeight: 700, color: 'var(--brown-mid)', fontSize: '14px' }}>Nova Categoria</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCategoryModalOpen(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(61,35,20,0.5)', backdropFilter: 'blur(8px)' }} />
             <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} style={{ position: 'relative', backgroundColor: 'white', width: '100%', maxWidth: '440px', borderRadius: '32px', padding: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brown)', marginBottom: '32px', letterSpacing: '-0.5px' }}>
                  {editingCategory ? 'Editar Categoria' : 'Criar Nova Categoria'}
                </h3>
                <form onSubmit={handleCategorySubmit} style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Nome da Categoria</label>
                    <input type="text" required value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1px solid #edf2f7', backgroundColor: '#f8fafc', outline: 'none' }} placeholder="Ex: Doces Tradicionais" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '10px', textTransform: 'uppercase' }}>Imagem da Categoria</label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      {categoryForm.image && <img src={categoryForm.image} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />}
                      <label style={{ 
                        flex: 1, 
                        padding: '16px 20px', 
                        borderRadius: '16px', 
                        border: '2px dashed #edf2f7', 
                        backgroundColor: '#f8fafc', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        color: '#64748b',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        <Plus size={20} /> Subir Foto
                        <input 
                          type="file" 
                          accept="image/*"
                          required={!categoryForm.image}
                          onChange={e => handleFileUpload(e, (base64) => setCategoryForm({...categoryForm, image: base64}))}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button type="submit" style={{ flex: 1, backgroundColor: 'var(--brown)', color: 'white', padding: '16px', borderRadius: '16px', border: 'none', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                      Salvar Categoria
                    </button>
                    <button type="button" onClick={() => setIsCategoryModalOpen(false)} style={{ padding: '16px 24px', borderRadius: '16px', border: 'none', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 700, cursor: 'pointer' }}>
                      Fechar
                    </button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(61, 35, 20, 0.08) !important;
        }
        
        @media (max-width: 767px) {
          .sidebar-responsive {
            width: 280px !important;
          }
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
          .main-content-dashboard {
            margin-left: 0 !important;
            padding-top: 80px !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .main-content-dashboard {
            margin-left: 280px;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fdfcfe;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          borderRadius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  )
}
