import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, LayoutDashboard, ArrowLeft } from 'lucide-react'
import type { Product } from '../hooks/useProducts'
import { useProducts } from '../hooks/useProducts'

interface DashboardProps {
  onBack: () => void
}

export default function Dashboard({ onBack }: DashboardProps) {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Docinhos',
    tags: []
  })

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: 0, image: '', category: 'Docinhos', tags: [] })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({ ...product })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
    } else {
      addProduct(formData)
    }
    setIsModalOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '80px' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'var(--brown)', 
        color: 'white', 
        padding: '40px 24px',
        marginBottom: '40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
               <button 
                onClick={onBack}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
               >
                 <ArrowLeft size={20} />
               </button>
               <LayoutDashboard size={28} style={{ color: 'var(--blush)' }} />
               <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Dashboard do Catálogo</h1>
            </div>
            <p style={{ opacity: 0.7, marginLeft: '52px' }}>Gerencie seus produtos, preços e fotos em tempo real.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            style={{ 
              backgroundColor: 'var(--rose)', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(201, 125, 140, 0.3)'
            }}
          >
            <Plus size={20} /> Novo Produto
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <motion.div 
              key={product.id}
              layout
              style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '200px', position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleOpenEdit(product)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brown)', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fee2e2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brown)', margin: 0 }}>{product.name}</h3>
                  <span style={{ backgroundColor: 'var(--cream)', color: 'var(--gold)', padding: '4px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 700 }}>
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{product.description}</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--rose)', backgroundColor: 'var(--blush)', padding: '2px 8px', borderRadius: '4px' }}>
                    {product.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(61,35,20,0.4)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ 
                position: 'relative', 
                backgroundColor: 'white', 
                width: '100%', 
                maxWidth: '600px', 
                borderRadius: '32px', 
                padding: '40px', 
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brown)', margin: 0 }}>
                  {editingProduct ? 'Editar Doce' : 'Cadastrar Novo Doce'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Nome do Produto</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }} 
                    placeholder="Ex: Brigadeiro de Pistache" 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                   <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Categoria</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', backgroundColor: 'white' }}
                    >
                      <option>Docinhos</option>
                      <option>Bolos</option>
                      <option>Kits</option>
                      <option>Mesa de Doces</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Preço (R$)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                      style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Descrição</label>
                  <textarea 
                    required
                    rows={3} 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', resize: 'none' }} 
                    placeholder="Descreva os ingredientes, tamanho ou detalhes especiais..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>URL da Foto</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      required
                      type="text" 
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      style={{ width: '100%', padding: '14px 20px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }} 
                      placeholder="Use link do Google Drive ou outra URL" 
                    />
                    <ImageIcon size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <button 
                  type="submit"
                  style={{ 
                    marginTop: '12px',
                    backgroundColor: 'var(--brown)', 
                    color: 'white', 
                    padding: '16px', 
                    borderRadius: '16px', 
                    fontWeight: 700, 
                    fontSize: '16px', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--brown-mid)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--brown)'}
                >
                  <Save size={20} /> {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
