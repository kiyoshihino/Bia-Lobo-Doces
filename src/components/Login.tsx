import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulated auth check with provided credentials
    setTimeout(() => {
      if (email === 'comercial@aartdigital.com.br' && password === '211938Mbt') {
        localStorage.setItem('bia_lobo_auth', 'true')
        onLogin()
      } else {
        setError('E-mail ou senha incorretos. Por favor, tente novamente.')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(201,125,140,0.08) 0%, transparent 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'white',
          borderRadius: '32px',
          padding: '48px clamp(24px, 5vw, 48px)',
          boxShadow: '0 25px 60px rgba(61, 35, 20, 0.08)',
          position: 'relative',
          zIndex: 1,
          border: '1px solid rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            borderRadius: '22px', 
            backgroundColor: 'var(--rose)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 12px 24px rgba(201, 125, 140, 0.25)'
          }}>
            <Lock size={32} color="white" />
          </div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            color: 'var(--brown)', 
            fontFamily: 'Playfair Display, serif',
            marginBottom: '12px'
          }}>
            Acesso Restrito
          </h1>
          <p style={{ 
            fontSize: '15px', 
            color: 'var(--brown-mid)', 
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            Olá! Digite suas credenciais para gerenciar o catálogo da Bia Lobo.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: 700, 
              color: 'var(--brown-mid)', 
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(61, 35, 20, 0.4)' }} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                style={{ 
                  width: '100%', 
                  padding: '16px 20px 16px 52px', 
                  borderRadius: '16px', 
                  border: '1px solid #edf2f7', 
                  backgroundColor: '#f8fafc', 
                  outline: 'none',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--rose)')}
                onBlur={e => (e.currentTarget.style.borderColor = '#edf2f7')}
              />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: 700, 
              color: 'var(--brown-mid)', 
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(61, 35, 20, 0.4)' }} />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '16px 52px 16px 52px', 
                  borderRadius: '16px', 
                  border: '1px solid #edf2f7', 
                  backgroundColor: '#f8fafc', 
                  outline: 'none',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--rose)')}
                onBlur={e => (e.currentTarget.style.borderColor = '#edf2f7')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(61, 35, 20, 0.4)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ color: '#ef4444', fontSize: '14px', fontWeight: 600, margin: 0, textAlign: 'center' }}
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              backgroundColor: 'var(--brown)', 
              color: 'white', 
              padding: '18px', 
              borderRadius: '18px', 
              border: 'none', 
              fontWeight: 800, 
              fontSize: '16px', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              boxShadow: '0 10px 30px rgba(61, 35, 20, 0.15)',
              marginTop: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(61, 35, 20, 0.25)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(61, 35, 20, 0.15)'
            }}
          >
            {isLoading ? 'Autenticando...' : 'Entrar no Painel'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'rgba(61, 35, 20, 0.4)', fontWeight: 600 }}>
            Painel Bia Lobo © 2026
          </p>
        </div>
      </motion.div>
    </div>
  )
}
