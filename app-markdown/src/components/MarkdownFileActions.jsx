import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MarkdownFileActions({ isOpen, onRequestClose, action, onImport, onExport }) {
  const [fileName, setFileName] = useState("README.md");

  if (!action) {
    return null;
  }

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      onImport(event.target.result);
      onRequestClose();
    };
    reader.readAsText(file);
  };

  const handleFileExport = () => {
    const element = document.createElement("a");
    const file = new Blob([action.markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{action.type === 'import' ? 'Importer un fichier Markdown' : 'Exporter un fichier Markdown'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action.type === 'import' ? (
          <div
            onClick={() => document.getElementById('fileInput').click()}
            className="border border-primary p-3 text-center"
            style={{ cursor: 'pointer' }}
          >
            Cliquez pour parcourir ou glissez un fichier ici
            <input
              id="fileInput"
              type="file"
              accept=".md"
              onChange={handleFileImport}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Nom du fichier"
            className="form-control"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={action.type === 'import' ? handleFileImport : handleFileExport}
        >
          {action.type === 'import' ? 'Importer' : 'Exporter'}
        </Button>
        <Button variant="secondary" onClick={onRequestClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MarkdownFileActions;
