import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form)
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const data = err.response?.data
      const validationErrors = data?.errors ? Object.values(data.errors).flat().join(' ') : ''
      setError(validationErrors || data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Welcome back to your image gallery</p>

        <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
