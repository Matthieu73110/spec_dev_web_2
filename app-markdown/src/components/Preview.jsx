import React from 'react';
import { marked } from 'marked';

const renderMarkdownWithImages = (markdown) => {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  let renderedMarkdown = markdown;

  images.forEach(image => {
    const imagePlaceholder = `![${image.name}](#${image.name})`;
    const imageMarkdown = `![${image.name}](${image.base64})`;
    renderedMarkdown = renderedMarkdown.replace(imagePlaceholder, imageMarkdown);
  });

  return renderedMarkdown;
};

function Preview({ markdown }) {
    return (
        <div
            style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc', overflowY: 'scroll' }}
            dangerouslySetInnerHTML={{ __html: marked(renderMarkdownWithImages(markdown)) }}
        />
    );
}

export default Preview;
