import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Markdown from './pages/Markdown';
import CompanyComponent from './pages/test';
import ViewBlocks from './components/ViewBlocksModal';
import AddBlock from './components/AddBlockModal';
import ViewShortcuts from './components/ViewShortcutsModal';
import AddShortcut from './components/AddShortcutModal';
import ImageImportModal from './components/ImageImportModal';
import ViewImagesModal from './components/ViewImagesModal';
import { ExportImagesModal, ImportImagesModal } from './components/ImagesExportImportModals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const [markdown, setMarkdown] = useState('');  // Initialiser l'état du markdown
  const [blocks, setBlocks] = useState(JSON.parse(localStorage.getItem('customBlocks')) || []);
  const [shortcuts, setShortcuts] = useState(JSON.parse(localStorage.getItem('shortcuts')) || []);

  const [modalState, setModalState] = useState({
    showImportModal: false,
    showExportModal: false,
    showViewBlocksModal: false,
    showAddBlockModal: false,
    showViewShortcutsModal: false,
    showAddShortcutModal: false,
    showImageImportModal: false,
    showViewImagesModal: false,
    showExportImageModal: false,
    showImportImageModal: false,
  });

  const openModal = (modalName) => {
    setModalState({ ...modalState, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModalState({ ...modalState, [modalName]: false });
  };

  const addBlock = (newBlock) => {
    const storedBlocks = [...blocks, newBlock];
    setBlocks(storedBlocks);
    localStorage.setItem('customBlocks', JSON.stringify(storedBlocks));
  };

  const removeBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
    localStorage.setItem('customBlocks', JSON.stringify(updatedBlocks));

    // Débind le bloc des raccourcis
    const updatedShortcuts = shortcuts.map(shortcut => {
      if (shortcut.blockIndex === index) {
        return { ...shortcut, blockIndex: null };
      } else if (shortcut.blockIndex > index) {
        // Ajuste l'index si un bloc avant a été supprimé
        return { ...shortcut, blockIndex: shortcut.blockIndex - 1 };
      }
      return shortcut;
    });
    setShortcuts(updatedShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
  };

  const addShortcut = (newShortcut) => {
    const storedShortcuts = [...shortcuts, newShortcut];
    setShortcuts(storedShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(storedShortcuts));
  };

  const updateShortcut = (index, updatedShortcut) => {
    const updatedShortcuts = shortcuts.map((shortcut, i) => (i === index ? updatedShortcut : shortcut));
    setShortcuts(updatedShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
  };

  const removeShortcut = (index) => {
    const updatedShortcuts = shortcuts.filter((_, i) => i !== index);
    setShortcuts(updatedShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
  };

  const handleInsertImage = (imageName) => {
    const markdownImageSyntax = `![${imageName}](#${imageName})`;
    setMarkdown((prev) => `${prev}\n${markdownImageSyntax}`);
  };


  

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/markdown">Markdown App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="fileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Fichier
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="fileDropdown">
                    <li><button className="dropdown-item" onClick={() => openModal('showImportModal')}>Importer</button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showExportModal')}>Exporter</button></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="blocksDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Blocks personnalisés
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="blocksDropdown">
                    <li><button className="dropdown-item" onClick={() => openModal('showViewBlocksModal')}>Voir les blocs personnalisés</button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showAddBlockModal')}>Ajouter un bloc personnalisé</button></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="shortcutsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Raccourcis
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="shortcutsDropdown">
                    <li><button className="dropdown-item" onClick={() => openModal('showViewShortcutsModal')}>Voir les raccourcis</button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showAddShortcutModal')}>Ajouter un raccourci</button></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="imagesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Images
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="imagesDropdown">
                    <li><button className="dropdown-item" onClick={() => openModal('showImageImportModal')}>Importer <i className="bi bi-upload"></i></button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showViewImagesModal')}>Voir les images</button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showExportImageModal')}>Exporter en .img.mdlc</button></li>
                    <li><button className="dropdown-item" onClick={() => openModal('showImportImageModal')}>Importer en .img.mdlc</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path='/markdown' element={<Markdown markdown={markdown} setMarkdown={setMarkdown} blocks={blocks} shortcuts={shortcuts} />}/>
          <Route path='/test' element={<CompanyComponent />} />
        </Routes>

        {/* Modales */}
        <ViewBlocks blocks={blocks} removeBlock={removeBlock} isOpen={modalState.showViewBlocksModal} onRequestClose={() => closeModal('showViewBlocksModal')} />
        <AddBlock addBlock={addBlock} isOpen={modalState.showAddBlockModal} onRequestClose={() => closeModal('showAddBlockModal')} />
        <ViewShortcuts shortcuts={shortcuts} updateShortcut={updateShortcut} removeShortcut={removeShortcut} isOpen={modalState.showViewShortcutsModal} onRequestClose={() => closeModal('showViewShortcutsModal')} />
        <AddShortcut blocks={blocks} addShortcut={addShortcut} isOpen={modalState.showAddShortcutModal} onRequestClose={() => closeModal('showAddShortcutModal')} />
        <ImageImportModal isOpen={modalState.showImageImportModal} onRequestClose={() => closeModal('showImageImportModal')} />
        <ViewImagesModal
          isOpen={modalState.showViewImagesModal}
          onRequestClose={() => closeModal('showViewImagesModal')}
          onInsertImage={handleInsertImage}  // Assurez-vous que cette prop est bien passée
        />
        <ExportImagesModal isOpen={modalState.showExportImageModal} onRequestClose={() => closeModal('showExportImageModal')} />
        <ImportImagesModal isOpen={modalState.showImportImageModal} onRequestClose={() => closeModal('showImportImageModal')} />
      </div>
    </BrowserRouter>
  );
}

export default App;
