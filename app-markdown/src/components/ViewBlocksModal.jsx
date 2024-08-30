import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { removeBlock } from '../store/features/blocksSlice';

function ViewBlocksModal({ isOpen, onRequestClose }) {
  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const handleRemoveBlock = (index) => {
    dispatch(removeBlock(index));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Voir les blocs" ariaHideApp={false}>
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
          <h5 className="modal-title">Blocs personnalisés</h5>
        </div>
        <div className="modal-body">
          {blocks.length === 0 ? (
            <p>Aucun bloc personnalisé n'a été créé.</p>
          ) : (
            <ul className="list-group">
              {blocks.map((block, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{block.name}</strong>
                    <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', marginTop: '5px' }}>
                      {block.content}
                    </pre>
                  </div>
                  <button
                    onClick={() => handleRemoveBlock(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ViewBlocksModal;
