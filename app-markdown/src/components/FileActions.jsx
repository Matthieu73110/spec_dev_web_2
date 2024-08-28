import React, { useState, useRef } from 'react';
import Modal from 'react-modal';

function FileActions({ markdown, onFileImport }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("README.md");
  const fileInputRef = useRef(null);

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileImport(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      readFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileExport = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    closeModal();
  };

  return (
    <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: '10px 20px',
          border: '2px dashed #ccc',
          borderRadius: '4px',
          backgroundColor: isDragging ? '#f0f0f0' : '#fff',
          textAlign: 'center',
          cursor: 'pointer',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDragging ? 'Déposez le fichier ici' : 'Choisir ou glisser un fichier'}
        <input
          type="file"
          accept=".md"
          onChange={handleFileImport}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>
      <button onClick={openModal} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Exporter le fichier
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Nommer et exporter le fichier"
        ariaHideApp={false}
      >
        <h2>Exporter le fichier</h2>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Nom du fichier"
          style={{ padding: '5px', width: '100%' }}
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleFileExport} style={{ marginRight: '10px' }}>
            Exporter
          </button>
          <button onClick={closeModal}>
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FileActions;
