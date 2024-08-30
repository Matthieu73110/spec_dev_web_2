import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addImage } from '../store/features/imagesSlice';

function ImageImportModal({ isOpen, onRequestClose }) {
  const [imageName, setImageName] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    if (imageName.trim() && imageBase64) {
      const sanitizedImageName = imageName.replace(/\s+/g, '-').toLowerCase();
      dispatch(addImage({ name: sanitizedImageName, base64: imageBase64 }));
      setImageName('');
      setImageBase64('');
      onRequestClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Importer une image</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Form.Control
          type="text"
          placeholder="Nom de l'image"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="mb-3"
        />
        <div
          onClick={() => document.getElementById('imageInput').click()}
          className="border border-primary p-3 text-center"
          style={{ cursor: 'pointer' }}
        >
          Cliquez pour parcourir ou glissez une image ici
          <input
            id="imageInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {imageBase64 && (
          <img
            src={imageBase64}
            alt="Aperçu"
            className="img-thumbnail mt-3"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddImage}>
          Ajouter l'image
        </Button>
        <Button variant="secondary" onClick={onRequestClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageImportModal;
