import React from 'react';
import { marked } from 'marked';

const renderMarkdownWithImages = (markdown) => {
  const persistedState = JSON.parse(localStorage.getItem('persist:root'));
  const images = JSON.parse(persistedState.images) || [];
  
  let renderedMarkdown = markdown;

  images.forEach(image => {
    const regex = new RegExp(`!\\[${image.name}\\]\\(#${image.name}\\)`, 'g');
    renderedMarkdown = renderedMarkdown.replace(regex, `![${image.name}](${image.base64})`);
  });

  return renderedMarkdown;
};

function Preview({ markdown }) {
    const renderedHTML = marked(renderMarkdownWithImages(markdown));

    return (
        <div
            style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc', overflowY: 'scroll' }}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
    );
}

export default Preview;
