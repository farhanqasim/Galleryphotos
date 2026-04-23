import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchImagesByFolderApi, uploadImageApi } from '../../api/imageApi'

const getImageArray = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.images)) return payload.data.images
  if (Array.isArray(payload?.images)) return payload.images
  return []
}

export const fetchImagesByFolder = createAsyncThunk(
  'images/fetchImagesByFolder',
  async (folderId, thunkApi) => {
    try {
      const data = await fetchImagesByFolderApi(folderId)
      return getImageArray(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to fetch images')
    }
  },
)

export const uploadImage = createAsyncThunk('images/uploadImage', async (payload, thunkApi) => {
  try {
    const data = await uploadImageApi(payload)
    return data?.image || data?.data || data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to upload image')
  }
})

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    items: [],
    loading: false,
    uploading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesByFolder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchImagesByFolder.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchImagesByFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true
        state.error = null
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false
        if (action.payload?.id) {
          state.items = [action.payload, ...state.items]
        }
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false
        state.error = action.payload
      })
  },
})

export default imageSlice.reducer
