import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
      dispatch(addBlock(newBlock));
      setNewBlockName('');
      setNewBlockContent('');
      onRequestClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un bloc personnalisé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="blockName">
            <Form.Label>Nom du bloc</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom du bloc"
              value={newBlockName}
              onChange={(e) => setNewBlockName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="blockContent" className="mt-3">
            <Form.Label>Contenu du bloc</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Contenu du bloc"
              value={newBlockContent}
              onChange={(e) => setNewBlockContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleAddBlock}>
          Ajouter le bloc
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBlockModal;
