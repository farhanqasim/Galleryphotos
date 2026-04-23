import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/authApi'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
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
      await registerApi(form)
      navigate('/login')
    } catch (err) {
      const data = err.response?.data
      const validationErrors = data?.errors ? Object.values(data.errors).flat().join(' ') : ''
      setError(validationErrors || data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p>Create your personal image gallery space</p>

        <input className="input" name="name" placeholder="Full name" onChange={handleChange} required />
        <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="password_confirmation"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
