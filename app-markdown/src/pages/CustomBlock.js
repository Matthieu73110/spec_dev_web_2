import React, { useState, useEffect } from 'react';

function CustomBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockContent, setNewBlockContent] = useState('');

  useEffect(() => {
    // Charger les blocs depuis le localStorage
    const storedBlocks = JSON.parse(localStorage.getItem('customBlocks')) || [];
    setBlocks(storedBlocks);
  }, []);

  const handleAddBlock = () => {
    if (newBlockName.trim() && newBlockContent.trim()) {
      const newBlock = {
        name: newBlockName,
        content: newBlockContent
      };
      const updatedBlocks = [...blocks, newBlock];
      setBlocks(updatedBlocks);
      localStorage.setItem('customBlocks', JSON.stringify(updatedBlocks));
      setNewBlockName('');
      setNewBlockContent('');
    }
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
    localStorage.setItem('customBlocks', JSON.stringify(updatedBlocks));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Créer un bloc personnalisé</h2>
      <input
        type="text"
        placeholder="Nom du bloc"
        value={newBlockName}
        onChange={(e) => setNewBlockName(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <textarea
        placeholder="Contenu du bloc"
        value={newBlockContent}
        onChange={(e) => setNewBlockContent(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', height: '100px' }}
      />
      <button onClick={handleAddBlock} style={{ padding: '10px 20px', marginBottom: '20px' }}>Ajouter le bloc</button>

      <h3>Blocs personnalisés</h3>
      <ul>
        {blocks.map((block, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{block.name}</strong>
            <button onClick={() => handleDeleteBlock(index)} style={{ marginLeft: '10px' }}>Supprimer</button>
            <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', marginTop: '5px' }}>
              {block.content}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomBlocks;
