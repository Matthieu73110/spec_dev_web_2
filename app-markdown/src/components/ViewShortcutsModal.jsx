import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateShortcut, removeShortcut } from '../store/features/shortcutsSlice';

function ViewShortcutsModal({ isOpen, onRequestClose }) {
  const shortcuts = useSelector((state) => state.shortcuts);
  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const handleShortcutChange = (index, event) => {
    const newBlockIndex = parseInt(event.target.value, 10);
    dispatch(updateShortcut({ index, updatedShortcut: { ...shortcuts[index], blockIndex: newBlockIndex } }));
  };

  const handleRemoveShortcut = (index) => {
    dispatch(removeShortcut(index));
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Raccourcis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {shortcuts.length === 0 ? (
          <p>Aucun raccourci n'a été créé.</p>
        ) : (
          <ul className="list-group">
            {shortcuts.map((shortcut, index) => (
              <li key={index} className="list-group-item">
                <strong>{shortcut.keySequence}</strong>
                <Form.Control
                  as="select"
                  value={shortcut.blockIndex !== null ? shortcut.blockIndex : ''}
                  onChange={(e) => handleShortcutChange(index, e)}
                  className="mt-2"
                >
                  <option value="">Aucun bloc assigné</option>
                  {blocks.map((block, i) => (
                    <option key={i} value={i}>
                      {block.name}
                    </option>
                  ))}
                </Form.Control>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveShortcut(index)}
                  className="mt-2"
                >
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

export default ViewShortcutsModal;
