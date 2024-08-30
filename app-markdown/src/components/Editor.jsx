import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Editor({ markdown, onMarkdownChange }) {
  const [pressedKeys, setPressedKeys] = useState([]);
  const blocks = useSelector((state) => state.blocks);
  const shortcuts = useSelector((state) => state.shortcuts);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      setPressedKeys((prevKeys) => [...prevKeys, key]);
    };

    const handleKeyUp = () => {
      const keySequence = pressedKeys.join('+');
      const shortcut = shortcuts.find((s) => s.keySequence === keySequence);

      if (shortcut && shortcut.blockIndex !== null && blocks[shortcut.blockIndex]) {
        onMarkdownChange(markdown + '\n' + blocks[shortcut.blockIndex].content);
      }

      // Réinitialisation des touches après vérification du raccourci
      setPressedKeys([]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedKeys, shortcuts, blocks, markdown, onMarkdownChange]);

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
            onClick={() => onMarkdownChange(markdown + '\n' + block.content)}
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
