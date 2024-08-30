import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liste: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    ajouterFichier: (state, action) => {
      const { parentId, name } = action.payload;
      const parent = state.liste.find((item) => item.id === parentId);
      if (parent) {
        // Vérifiez si le parent est un dossier
        if (parent.children) {
          parent.children.push({ id: Date.now(), name, children: undefined });
        } else {
          console.error("Vous ne pouvez pas ajouter un fichier dans un fichier.");
        }
      } else {
        state.liste.push({ id: Date.now(), name, children: undefined });
      }
    },
    ajouterDossier: (state, action) => {
      const { parentId, name } = action.payload;
      const parent = state.liste.find((item) => item.id === parentId);
      if (parent) {
        // Vérifiez si le parent est un dossier
        if (parent.children) {
          parent.children.push({ id: Date.now(), name, children: [] });
        } else {
          console.error("Vous ne pouvez pas ajouter un dossier dans un fichier.");
        }
      } else {
        state.liste.push({ id: Date.now(), name, children: [] });
      }
    },
    renommerElement: (state, action) => {
      const { id, name } = action.payload;
      const element = state.liste.find((item) => item.id === id);
      if (element) {
        element.name = name;
      }
    },
    supprimerElement: (state, action) => {
      const { id } = action.payload;
      state.liste = state.liste.filter((item) => item.id !== id);
      state.liste.forEach((parent) => {
        if (parent.children) {
          parent.children = parent.children.filter((child) => child.id !== id);
        }
      });
    },
  },
});

export const { ajouterFichier, ajouterDossier, renommerElement, supprimerElement } = filesSlice.actions;
export default filesSlice.reducer;
