import React, { useState, useEffect } from 'react';

function ViewBlocks() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const storedBlocks = JSON.parse(localStorage.getItem('customBlocks')) || [];
    setBlocks(storedBlocks);
  }, []);

  return (
    <div className="container">
      <h2>Blocs personnalisés</h2>
      {blocks.length === 0 ? (
        <p>Aucun bloc personnalisé n'a été créé.</p>
      ) : (
        <ul className="list-group">
          {blocks.map((block, index) => (
            <li key={index} className="list-group-item">
              <strong>{block.name}</strong>
              <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', marginTop: '5px' }}>
                {block.content}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewBlocks;
