import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: {
    global: false,
    auth: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { type, value } = action.payload;
      state.loading[type] = value;
    },
  },
});

export const { setLoading } = uiSlice.actions;

export default uiSlice.reducer;
