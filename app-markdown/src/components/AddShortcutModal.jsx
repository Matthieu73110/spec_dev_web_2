import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addShortcut } from '../store/features/shortcutsSlice';

function AddShortcutModal({ isOpen, onRequestClose }) {
  const [keySequence, setKeySequence] = useState('');
  const [blockIndex, setBlockIndex] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isRecording) {
        event.preventDefault();
        let keys = keySequence.split('+').filter(Boolean);
        const key = event.key;

        if (['Control', 'Shift', 'Alt', 'Meta'].includes(key) && !keys.includes(key)) {
          keys.push(key);
        } else if (!['Control', 'Shift', 'Alt', 'Meta'].includes(key)) {
          keys.push(key);
        }

        setKeySequence(keys.join('+'));
      }
    };

    if (isRecording) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording, keySequence]);

  const startRecording = () => {
    setKeySequence('');
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleAddShortcut = () => {
    if (keySequence.trim()) {
      const parsedBlockIndex = blockIndex !== '' ? parseInt(blockIndex, 10) : null;
      dispatch(addShortcut({ keySequence, blockIndex: parsedBlockIndex }));
      setKeySequence('');
      setBlockIndex('');
      onRequestClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={() => { stopRecording(); onRequestClose(); }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un raccourci</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="keySequence" className="mb-3">
          <Form.Label>Séquence de touches</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Appuyez sur 'Record' pour commencer"
              value={keySequence}
              readOnly
              className="me-2"
            />
            <Button variant={isRecording ? 'danger' : 'primary'} onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? 'Stop' : 'Record'}
            </Button>
          </div>
        </Form.Group>
        <Form.Group controlId="blockSelect" className="mb-3">
          <Form.Label>Bloc assigné</Form.Label>
          <Form.Control
            as="select"
            value={blockIndex}
            onChange={(e) => setBlockIndex(e.target.value)}
          >
            <option value="">Sélectionnez un bloc</option>
            {blocks.map((block, index) => (
              <option key={index} value={index}>{block.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { stopRecording(); onRequestClose(); }}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleAddShortcut}>
          Ajouter le raccourci
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddShortcutModal;
