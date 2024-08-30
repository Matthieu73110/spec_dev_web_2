import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setBlocks } from '../store/features/blocksSlice';

function ExportBlocksModal({ isOpen, onRequestClose }) {
  const blocks = useSelector((state) => state.blocks);

  const handleExport = () => {
    const fileContent = JSON.stringify(blocks, null, 2);
    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "blocks.parts.mdlc";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Exporter les blocs</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={handleExport}>
          Exporter
        </Button>
        <Button variant="secondary" onClick={onRequestClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ImportBlocksModal({ isOpen, onRequestClose }) {
  const dispatch = useDispatch();

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedBlocks = JSON.parse(event.target.result);
        if (importedBlocks && importedBlocks.length > 0) {
          dispatch(setBlocks(importedBlocks));
        } else {
          alert("Le fichier importé ne contient aucun bloc valide.");
        }
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        alert("Erreur lors de l'importation du fichier.");
      }
      onRequestClose();
    };
    reader.readAsText(file);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Importer des blocs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          onClick={() => document.getElementById('blocksFileInput').click()}
          className="border border-primary p-3 text-center"
          style={{ cursor: 'pointer' }}
        >
          Cliquez pour parcourir ou glissez un fichier ici
          <input
            id="blocksFileInput"
            type="file"
            onChange={handleFileImport}
            style={{ display: 'none' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ExportBlocksModal, ImportBlocksModal };
