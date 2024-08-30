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
    <div className="d-flex align-items-center border-top pt-3">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`btn ${isDragging ? 'btn-secondary' : 'btn-primary'} me-3`}
        style={{
          width: '200px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {isDragging ? 'Déposez ici' : 'Importer le fichier'}
        <input
          type="file"
          accept=".md"
          onChange={handleFileImport}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>
      <button onClick={openModal} className="btn btn-primary" style={{ width: '200px', height: '40px' }}>
        Exporter le fichier
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Nommer et exporter le fichier"
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h5 className="modal-title">Exporter le fichier</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Nom du fichier"
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleFileExport} className="btn btn-primary">
            Exporter
          </button>
          <button onClick={closeModal} className="btn btn-secondary">
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FileActions;
