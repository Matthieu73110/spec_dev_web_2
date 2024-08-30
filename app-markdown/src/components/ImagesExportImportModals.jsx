import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setImages } from '../store/features/imagesSlice';

function ExportImagesModal({ isOpen, onRequestClose }) {
  const handleExport = () => {
    const persistedState = JSON.parse(localStorage.getItem('persist:root'));

    if (persistedState && persistedState.storage) {
      const storageState = JSON.parse(persistedState.storage);
      const images = JSON.parse(persistedState.images);

      if (images && images.length > 0) {
        const fileContent = JSON.stringify(images, null, 2);
        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "images.img.mdlc";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        alert("Aucune image à exporter.");
      }
    } else {
      alert("Aucune image à exporter.");
    }

    onRequestClose();
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Exporter les images</Modal.Title>
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

function ImportImagesModal({ isOpen, onRequestClose }) {
  const dispatch = useDispatch();

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedImages = JSON.parse(event.target.result);

        if (importedImages && importedImages.length > 0) {
          dispatch(setImages(importedImages));
        } else {
          alert("Le fichier importé ne contient aucune image valide.");
        }
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        alert("Erreur lors de l'importation du fichier. Le fichier peut être corrompu ou mal formaté.");
      }
      onRequestClose();
    };
    reader.readAsText(file);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Importer des images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          onClick={() => document.getElementById('imageFileInput').click()}
          className="border border-primary p-3 text-center"
          style={{ cursor: 'pointer' }}
        >
          Cliquez pour parcourir ou glissez un fichier ici
          <input
            id="imageFileInput"
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

export { ExportImagesModal, ImportImagesModal };
