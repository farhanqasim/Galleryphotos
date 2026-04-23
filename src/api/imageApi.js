import api from './axios'

export const fetchAllImagesApi = async () => {
  const response = await api.post('/images')
  return response.data
}

export const fetchImagesByFolderApi = async (folderId) => {
  const response = await api.get(`/folders/${folderId}/images`)
  return response.data
}

export const uploadImageApi = async (payload) => {
  const response = await api.post('/create/image', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
