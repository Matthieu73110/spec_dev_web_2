import React from 'react';

function Editor({ markdown, onMarkdownChange }) {
  return (
    <textarea
      style={{ flex: 1, padding: '10px', fontSize: '16px' }}
      value={markdown}
      onChange={(e) => onMarkdownChange(e.target.value)}
    />
  );
}

export default Editor;
