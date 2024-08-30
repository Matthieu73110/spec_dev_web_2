import React from 'react';
import { marked } from 'marked';

function Preview({ markdown }) {
  const createMarkup = () => {
    return { __html: marked(markdown) };
  };

  return (
    <div
      style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc', overflowY: 'scroll' }}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
}

export default Preview;
