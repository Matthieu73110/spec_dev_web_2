import { createSlice } from '@reduxjs/toolkit';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: JSON.parse(localStorage.getItem('customBlocks')) || [],
  reducers: {
    addBlock: (state, action) => {
      state.push(action.payload);
    },
    removeBlock: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    setBlocks: (state, action) => {
      return action.payload;
    }
  }
});

export const { addBlock, removeBlock, setBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
