import { createContext, useEffect, useMemo, useState } from 'react'
import { loginApi } from '../api/authApi'

export const AuthContext = createContext(null)

const getTokenFromResponse = (data) => {
  return (
    data?.token ||
    data?.access_token ||
    data?.data?.token ||
    data?.data?.access_token ||
    data?.authorisation?.token ||
    data?.authorization?.token
  )
}

const getUserFromResponse = (data) => {
  return data?.user || data?.data?.user || null
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (credentials) => {
    const data = await loginApi(credentials)
    const newToken = getTokenFromResponse(data)
    const newUser = getUserFromResponse(data)

    if (!newToken) {
      throw new Error(
        data?.message || 'Token not returned from API. Check login response shape from backend.',
      )
    }

    setToken(newToken)
    setUser(newUser)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
