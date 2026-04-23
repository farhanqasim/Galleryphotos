import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import folderReducer from '../features/folders/folderSlice'
import imageReducer from '../features/images/imageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    folders: folderReducer,
    images: imageReducer,
  },
})
