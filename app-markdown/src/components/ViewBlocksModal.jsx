import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeBlock } from '../store/features/blocksSlice';

function ViewBlocksModal({ isOpen, onRequestClose }) {
  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const handleRemoveBlock = (index) => {
    dispatch(removeBlock(index));
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Blocs personnalisés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                <Button variant="danger" size="sm" onClick={() => handleRemoveBlock(index)}>
                  Supprimer
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewBlocksModal;
