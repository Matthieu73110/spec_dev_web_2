import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeImage, renameImage } from '../store/features/imagesSlice';

function ViewImagesModal({ isOpen, onRequestClose, onInsertImage }) {
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const handleRenameImage = (index, newName) => {
    dispatch(renameImage({ index, newName }));
  };

  const handleRemoveImage = (index) => {
    dispatch(removeImage(index));
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bibliothèque d'images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {images.length === 0 ? (
          <p>Aucune image disponible.</p>
        ) : (
          <div className="d-flex flex-wrap">
            {images.map((image, index) => (
              <div
                key={index}
                className="p-2 text-center"
                style={{ width: '100px' }}
              >
                <input
                  type="text"
                  defaultValue={image.name}
                  onBlur={(e) => handleRenameImage(index, e.target.value)}
                  className="form-control mb-2"
                />
                <img
                  src={image.base64}
                  alt={image.name}
                  className="img-thumbnail"
                  style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                  onClick={() => onInsertImage(image.name)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                  className="mt-2"
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewImagesModal;
