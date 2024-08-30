import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeBlock, setBlocks } from '../store/features/blocksSlice';

function ViewBlocksModal({ isOpen, onRequestClose }) {
  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(null);
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockContent, setNewBlockContent] = useState('');

  const handleEditBlock = (index) => {
    setEditingIndex(index);
    setNewBlockName(blocks[index].name);
    setNewBlockContent(blocks[index].content);
  };

  const handleSaveEdit = () => {
    const updatedBlocks = [...blocks];
    updatedBlocks[editingIndex] = { name: newBlockName, content: newBlockContent };
    dispatch(setBlocks(updatedBlocks));
    setEditingIndex(null);
    setNewBlockName('');
    setNewBlockContent('');
  };

  const handleExportBlock = (index) => {
    const block = blocks[index];
    const fileContent = JSON.stringify(block, null, 2);
    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${block.name}.part.mdlc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
              <li key={index} className="list-group-item">
                {editingIndex === index ? (
                  <>
                    <Form.Control
                      type="text"
                      value={newBlockName}
                      onChange={(e) => setNewBlockName(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newBlockContent}
                      onChange={(e) => setNewBlockContent(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleSaveEdit} variant="success" size="sm" className="me-2">
                      Enregistrer
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{block.name}</strong>
                      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', marginTop: '5px' }}>
                        {block.content}
                      </pre>
                    </div>
                    <Button
                      onClick={() => handleEditBlock(index)}
                      variant="warning"
                      size="sm"
                      className="me-2"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleExportBlock(index)}
                      variant="primary"
                      size="sm"
                      className="me-2"
                    >
                      Exporter
                    </Button>
                    <Button
                      onClick={() => handleRemoveBlock(index)}
                      variant="danger"
                      size="sm"
                    >
                      Supprimer
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewBlocksModal;
