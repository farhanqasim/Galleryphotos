import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createFolderApi, fetchFoldersApi } from '../../api/folderApi'

const getFolderArray = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.folders)) return payload.folders
  return []
}

export const fetchFolders = createAsyncThunk('folders/fetchFolders', async (_, thunkApi) => {
  try {
    const data = await fetchFoldersApi()
    return getFolderArray(data)
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to fetch folders')
  }
})

export const createFolder = createAsyncThunk('folders/createFolder', async (payload, thunkApi) => {
  try {
    const data = await createFolderApi(payload)
    return data?.folder || data?.data || data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to create folder')
  }
})

const folderSlice = createSlice({
  name: 'folders',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createFolder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.id) {
          state.items = [action.payload, ...state.items]
        }
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default folderSlice.reducer
