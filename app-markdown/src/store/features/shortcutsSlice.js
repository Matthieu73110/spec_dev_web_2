import { createSlice } from '@reduxjs/toolkit';

const shortcutsSlice = createSlice({
  name: 'shortcuts',
  initialState: JSON.parse(localStorage.getItem('shortcuts')) || [],
  reducers: {
    addShortcut: (state, action) => {
      state.push(action.payload);
    },
    removeShortcut: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    updateShortcut: (state, action) => {
      const { index, updatedShortcut } = action.payload;
      state[index] = updatedShortcut;
    },
    setShortcuts: (state, action) => {
      return action.payload;
    }
  }
});

export const { addShortcut, removeShortcut, updateShortcut, setShortcuts } = shortcutsSlice.actions;
export default shortcutsSlice.reducer;
