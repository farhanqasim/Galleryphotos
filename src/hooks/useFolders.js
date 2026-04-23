import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFolder, fetchFolders } from '../features/folders/folderSlice'

export const useFolders = () => {
  const dispatch = useDispatch()
  const foldersState = useSelector((state) => state.folders)
  const fetchFoldersData = useCallback(() => dispatch(fetchFolders()), [dispatch])
  const createFolderData = useCallback((payload) => dispatch(createFolder(payload)), [dispatch])

  return {
    ...foldersState,
    fetchFolders: fetchFoldersData,
    createFolder: createFolderData,
  }
}
