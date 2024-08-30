import React, { useState } from 'react';

function CustomBlocks() {
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockContent, setNewBlockContent] = useState('');

  const handleAddBlock = () => {
    if (newBlockName.trim() && newBlockContent.trim()) {
      const newBlock = {
        name: newBlockName,
        content: newBlockContent
      };
      const storedBlocks = JSON.parse(localStorage.getItem('customBlocks')) || [];
      const updatedBlocks = [...storedBlocks, newBlock];
      localStorage.setItem('customBlocks', JSON.stringify(updatedBlocks));
      setNewBlockName('');
      setNewBlockContent('');
    }
  };

  return (
    <div className="container">
      <h2>Créer un bloc personnalisé</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nom du bloc"
          value={newBlockName}
          onChange={(e) => setNewBlockName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Contenu du bloc"
          value={newBlockContent}
          onChange={(e) => setNewBlockContent(e.target.value)}
          className="form-control"
          rows="4"
        />
      </div>
      <button onClick={handleAddBlock} className="btn btn-primary">
        Ajouter le bloc
      </button>
    </div>
  );
}

export default CustomBlocks;
