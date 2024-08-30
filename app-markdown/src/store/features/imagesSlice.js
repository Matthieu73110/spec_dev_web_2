import { createSlice } from '@reduxjs/toolkit';

const imagesSlice = createSlice({
  name: 'images',
  initialState: JSON.parse(localStorage.getItem('images')) || [],
  reducers: {
    addImage: (state, action) => {
      state.push(action.payload);
    },
    removeImage: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    renameImage: (state, action) => {
      const { index, newName } = action.payload;
      state[index].name = newName;
    },
    setImages: (state, action) => {
      return action.payload;
    },
  },
});

export const { addImage, removeImage, renameImage, setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
