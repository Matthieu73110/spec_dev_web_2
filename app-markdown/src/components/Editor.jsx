import React, { useState, useEffect } from 'react';

function Editor({ markdown, onMarkdownChange }) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Charger les blocs depuis le localStorage
    const storedBlocks = JSON.parse(localStorage.getItem('customBlocks')) || [];
    setBlocks(storedBlocks);
  }, []);

  const handleInsertBlock = (blockContent) => {
    onMarkdownChange(markdown + '\n' + blockContent);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <textarea
        style={{ flex: 1, padding: '10px', fontSize: '16px', height: '80vh' }}
        value={markdown}
        onChange={(e) => onMarkdownChange(e.target.value)}
      />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start' }}>
        {blocks.map((block, index) => (
          <button
            key={index}
            onClick={() => handleInsertBlock(block.content)}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            {block.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Editor;
