import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
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
      console.log("Raccourci ajouté :", { keySequence, blockIndex: parsedBlockIndex });
      dispatch(addShortcut({ keySequence, blockIndex: parsedBlockIndex }));
      setKeySequence('');
      setBlockIndex('');
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => { stopRecording(); onRequestClose(); }} contentLabel="Ajouter un raccourci" ariaHideApp={false}>
      <div className="position-relative">
        <button
          type="button"
          className="btn btn-danger position-absolute top-0 end-0 m-2"
          onClick={() => { stopRecording(); onRequestClose(); }}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="modal-header">
          <h5 className="modal-title">Ajouter un raccourci</h5>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <div className="d-flex">
              <input
                type="text"
                placeholder="Appuyez sur 'Record' pour commencer"
                value={keySequence}
                readOnly
                className="form-control me-2"
              />
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`}
              >
                {isRecording ? 'Stop' : 'Record'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <select
              value={blockIndex}
              onChange={(e) => setBlockIndex(e.target.value)}
              className="form-select"
            >
              <option value="">Sélectionnez un bloc</option>
              {blocks.map((block, index) => (
                <option key={index} value={index}>{block.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleAddShortcut} className="btn btn-primary">
            Ajouter le raccourci
          </button>
          <button onClick={() => { stopRecording(); onRequestClose(); }} className="btn btn-secondary">
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddShortcutModal;
