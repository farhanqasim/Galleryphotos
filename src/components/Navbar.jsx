import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()

  if (!isAuthenticated) return null

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="brand">
        PixelVault
      </Link>

      <div className="nav-links">
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/folders" className="nav-link">
          Folders
        </NavLink>
      </div>

      <div className="nav-right">
        <span className="welcome-text">Hi, {user?.name || 'User'}</span>
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
