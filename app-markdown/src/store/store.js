import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageReducer from './features/localstorage'; // Importation du nouveau reducer dynamique

// Configuration de persist pour le stockage dans localStorage
const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

// Combiner les reducers
const rootReducer = combineReducers({
  // image: imageReducer,
  storage: storageReducer, 
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
