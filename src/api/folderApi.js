import api from './axios'

export const fetchFoldersApi = async () => {
  const response = await api.post('/folders')
  return response.data
}

export const createFolderApi = async (payload) => {
  const response = await api.post('/create/folder', payload)
  return response.data
}
