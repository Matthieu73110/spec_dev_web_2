import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addBlock } from '../store/features/blocksSlice';

function AddBlockModal({ isOpen, onRequestClose }) {
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockContent, setNewBlockContent] = useState('');
  const dispatch = useDispatch();

  const handleAddBlock = () => {
    if (newBlockName.trim() && newBlockContent.trim()) {
      const newBlock = {
        name: newBlockName,
        content: newBlockContent,
      };
      dispatch(addBlock(newBlock));  // Ajoute le bloc via Redux
      setNewBlockName('');
      setNewBlockContent('');
      onRequestClose();  // Fermer la modale après l'ajout du bloc
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Ajouter un bloc" ariaHideApp={false}>
      <div className="position-relative">
        <button
          type="button"
          className="btn btn-danger position-absolute top-0 end-0 m-2"
          onClick={onRequestClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="modal-header">
          <h5 className="modal-title">Ajouter un bloc personnalisé</h5>
        </div>
        <div className="modal-body">
          <div className="mb-3 mt-4">
            <input
              type="text"
              placeholder="Nom du bloc"
              value={newBlockName}
              onChange={(e) => setNewBlockName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Contenu du bloc"
              value={newBlockContent}
              onChange={(e) => setNewBlockContent(e.target.value)}
              className="form-control"
              rows="4"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleAddBlock} className="btn btn-primary">
            Ajouter le bloc
          </button>
          <button onClick={onRequestClose} className="btn btn-secondary">
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddBlockModal;
