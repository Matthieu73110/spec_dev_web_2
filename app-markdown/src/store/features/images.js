import { createSlice } from '@reduxjs/toolkit';

// Initialiser avec des données vides ou récupérer les données depuis le localStorage
const initialState = {
  isLoading: false,
  errorMsg: "",
  data: {}
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setItem: (state, action) => {
      const { key, value } = action.payload;
      state.data[key] = value; // Mettre à jour l'état local
      localStorage.setItem(key, JSON.stringify(value)); // Sauvegarder dans le localStorage
    },
    removeItem: (state, action) => {
      const { key } = action.payload;
      delete state.data[key]; // Supprimer l'élément de l'état local
      localStorage.removeItem(key); // Supprimer du localStorage
    },
    resetStorage: (state) => {
      state.data = {}; // Réinitialiser l'état
      localStorage.clear(); // Effacer tout le localStorage
    },
  },
});

// Exporter les actions générées
export const { setItem, removeItem, resetStorage } = storageSlice.actions;

export default storageSlice.reducer;
