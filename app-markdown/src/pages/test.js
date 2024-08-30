import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItem, removeItem, resetStorage } from '../store/features/localstorage'; // Adapte le chemin selon ton fichier

const StorageManager = () => {
  const dispatch = useDispatch();
  const storageData = useSelector((state) => state.storage.data); // Sélectionner les données du store

  // États locaux pour gérer les saisies de clé et de valeur
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  // Fonction pour sauvegarder une clé/valeur dans le localStorage
  const handleSave = () => {
    if (key && value) {
      dispatch(setItem({ key, value })); // Dispatcher l'action avec la clé et la valeur
      setKey('');
      setValue('');
    }
  };

  // Fonction pour supprimer une clé spécifique
  const handleRemove = (key) => {
    dispatch(removeItem({ key }));
  };

  // Fonction pour réinitialiser toutes les données
  const handleReset = () => {
    dispatch(resetStorage());
  };

  return (
    <div>
      <h1>Gestionnaire de Local Storage</h1>

      <input
        type="text"
        placeholder="Clé"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <input
        type="text"
        placeholder="Valeur"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleSave}>Enregistrer</button>

      <button onClick={handleReset}>Réinitialiser</button>

      <h2>Données Stockées :</h2>
      <ul>
        {Object.entries(storageData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}{' '}
            <button onClick={() => handleRemove(key)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageManager;
