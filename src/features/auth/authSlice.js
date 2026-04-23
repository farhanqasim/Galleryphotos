import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setAuthStatus } = authSlice.actions
export default authSlice.reducer
