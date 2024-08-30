import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageReducer from './features/localstorage'; // Importation du reducer dynamique
import blocksReducer from './features/blocksSlice';  // Importation du blocksReducer
import shortcutsReducer from './features/shortcutsSlice';  // Importation du shortcutsReducer

// Configuration de persist pour le stockage dans localStorage
const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

// Combiner les reducers
const rootReducer = combineReducers({
  storage: storageReducer, 
  blocks: blocksReducer,       // Ajout du reducer des blocs
  shortcuts: shortcutsReducer, // Ajout du reducer des raccourcis
});

// Appliquer le reducer persisté
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configuration du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Configuration du persistor
export const persistor = persistStore(store);
