import React from 'react';
import Modal from 'react-modal';
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Voir les raccourcis" ariaHideApp={false}>
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
          <h5 className="modal-title">Raccourcis</h5>
        </div>
        <div className="modal-body">
          {shortcuts.length === 0 ? (
            <p>Aucun raccourci n'a été créé.</p>
          ) : (
            <ul className="list-group">
              {shortcuts.map((shortcut, index) => (
                <li key={index} className="list-group-item">
                  <strong>{shortcut.keySequence}</strong>
                  <select
                    id={`shortcut-select-${index}`}
                    value={shortcut.blockIndex !== null ? shortcut.blockIndex : ''}
                    onChange={(e) => handleShortcutChange(index, e)}
                    className="form-select mt-2"
                  >
                    <option value="">Aucun bloc assigné</option>
                    {blocks.map((block, i) => (
                      <option key={i} value={i}>
                        {block.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveShortcut(index)}
                    className="btn btn-danger btn-sm mt-2"
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

export default ViewShortcutsModal;
