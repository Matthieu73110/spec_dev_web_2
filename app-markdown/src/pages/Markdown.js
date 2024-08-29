import React, {useState} from 'react';
// import { useSelector } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import FileActions from '../components/FileActions';

function Markdown() {

    const [markdown, setMarkdown] = useState("# Hello World!");

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
  };

  const handleFileImport = (content) => {
    setMarkdown(content);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <Editor markdown={markdown} onMarkdownChange={handleMarkdownChange} />
        <Preview markdown={markdown} />
      </div>
      <FileActions markdown={markdown} onFileImport={handleFileImport} />
    </div>
  ); 
}

export default Markdown;