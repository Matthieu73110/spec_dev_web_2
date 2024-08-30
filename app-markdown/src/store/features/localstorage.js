import { createSlice } from '@reduxjs/toolkit';

// Initialiser avec des données du localStorage ou avec un état par défaut
const initialState = {
  isLoading: false,
  errorMsg: "",
  data: JSON.parse(localStorage.getItem('data')) || {
    files: [], // Arborescence des fichiers/dossiers initiale
  },
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setItem: (state, action) => {
      const { key, value } = action.payload;
      state.data[key] = value;
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    removeItem: (state, action) => {
      const { key } = action.payload;
      delete state.data[key];
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    resetStorage: (state) => {
      state.data = {};
      localStorage.clear();
    },
    ajouterFichier: (state, action) => {
      const { parentId, newFile } = action.payload;

      if (!Array.isArray(state.data.files)) {
        state.data.files = [];
      }

      if (parentId) {
        const parent = state.data.files.find(file => file.id === parentId);

        if (parent && parent.type === 'folder') {
          if (Array.isArray(parent.children)) {
            parent.children.push(newFile);
          } else {
            parent.children = [newFile];
          }
        } else {
          console.error("Vous ne pouvez pas ajouter un fichier dans un fichier ou un dossier inexistant.");
        }
      } else {
        state.data.files.push(newFile);
      }

      localStorage.setItem('data', JSON.stringify(state.data));
    },
    ajouterDossier: (state, action) => {
      const { parentId, newFolder } = action.payload;

      if (!Array.isArray(state.data.files)) {
        state.data.files = [];
      }

      if (parentId) {
        const parent = state.data.files.find(file => file.id === parentId);

        if (parent && parent.type === 'folder') {
          if (Array.isArray(parent.children)) {
            parent.children.push(newFolder);
          } else {
            parent.children = [newFolder];
          }
        } else {
          console.error("Vous ne pouvez pas ajouter un dossier dans un fichier ou un dossier inexistant.");
        }
      } else {
        state.data.files.push(newFolder);
      }

      localStorage.setItem('data', JSON.stringify(state.data));
    },
    supprimerFichier: (state, action) => {
      const fileId = action.payload;

      if (!Array.isArray(state.data.files)) {
        console.error("Aucun fichier à supprimer.");
        return;
      }

      // Vérifiez si le fichier existe
      const fileToRemove = state.data.files.find(file => file?.id === fileId);
      if (!fileToRemove) {
        console.error("Le fichier à supprimer n'existe pas.");
        return;
      }

      // Suppression du fichier
      state.data.files = state.data.files.filter(file => file?.id !== fileId);
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    renommerFichier: (state, action) => {
      const { id, newName } = action.payload;
  
      // Vérifier que state.data.files existe et est un tableau
      if (!Array.isArray(state.data.files)) {
          console.error("La liste des fichiers est vide ou non valide.");
          return;
      }
  
      // Trouver le fichier à renommer
      const file = state.data.files.find(file => file?.id === id);
  
      // Vérifier que le fichier existe
      if (!file) {
          console.error(`Le fichier avec l'id ${id} n'a pas été trouvé.`);
          return;
      }
  
      // Renommer le fichier
      file.name = newName;
  
      // Mettre à jour le localStorage
      localStorage.setItem('data', JSON.stringify(state.data));
  },
  },
});

// Exporter les actions générées
export const { setItem, removeItem, resetStorage, ajouterFichier, ajouterDossier, supprimerFichier, renommerFichier } = storageSlice.actions;

export default storageSlice.reducer;
