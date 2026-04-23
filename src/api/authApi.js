import api from './axios'

export const registerApi = async (payload) => {
  const response = await api.post('/register', payload)
  return response.data
}

export const loginApi = async (payload) => {
  const response = await api.post('/login', payload)
  return response.data
}
