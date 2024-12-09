import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  role: string | null; // Add role to the state
}

const initialState: AuthState = {
  token: null,
  role: null, // Default to null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.role = action.payload; // Set the role in the state
    },
    logout(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAccessToken, setUserRole, logout } = authSlice.actions;

export default authSlice.reducer;
