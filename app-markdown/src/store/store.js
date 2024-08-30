import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageReducer from './features/localstorage';
import blocksReducer from './features/blocksSlice';  
import shortcutsReducer from './features/shortcutsSlice';
import imagesReducer from './features/imagesSlice';

// Configuration de persist pour le stockage dans localStorage
const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

// Combiner les reducers
const rootReducer = combineReducers({
  storage: storageReducer, 
  blocks: blocksReducer,       
  shortcuts: shortcutsReducer,
  images: imagesReducer,
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
