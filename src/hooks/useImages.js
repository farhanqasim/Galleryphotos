import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImagesByFolder, uploadImage } from '../features/images/imageSlice'

export const useImages = () => {
  const dispatch = useDispatch()
  const imagesState = useSelector((state) => state.images)
  const getImagesByFolder = useCallback((folderId) => dispatch(fetchImagesByFolder(folderId)), [dispatch])
  const uploadImageData = useCallback((payload) => dispatch(uploadImage(payload)), [dispatch])

  return {
    ...imagesState,
    fetchImagesByFolder: getImagesByFolder,
    uploadImage: uploadImageData,
  }
}
