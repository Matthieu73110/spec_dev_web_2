import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
import MarkdownFileActions from './components/MarkdownFileActions';
import { ExportBlocksModal, ImportBlocksModal } from './components/BlocksExportImportModals';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [markdown, setMarkdown] = useState('');
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
    showImportBlocksModal: false,
    showExportBlocksModal: false,
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

    const updatedShortcuts = shortcuts.map(shortcut => {
      if (shortcut.blockIndex === index) {
        return { ...shortcut, blockIndex: null };
      } else if (shortcut.blockIndex > index) {
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
        <Navbar bg="primary" variant="dark" expand="lg">
          <div className="container-fluid">
            <Navbar.Brand as={Link} to="/markdown">Markdown App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Fichier" id="fileDropdown">
                  <NavDropdown.Item onClick={() => openModal('showImportModal')}>Importer fichier .md</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showExportModal')}>Exporter fichier .md</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Blocks personnalisés" id="blocksDropdown">
                  <NavDropdown.Item onClick={() => openModal('showViewBlocksModal')}>Voir les blocs personnalisés</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showAddBlockModal')}>Ajouter un bloc personnalisé</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showImportBlocksModal')}>Importer des blocs personnalisés</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showExportBlocksModal')}>Exporter des blocs personnalisés</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Raccourcis" id="shortcutsDropdown">
                  <NavDropdown.Item onClick={() => openModal('showViewShortcutsModal')}>Voir les raccourcis</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showAddShortcutModal')}>Ajouter un raccourci</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Images" id="imagesDropdown">
                  <NavDropdown.Item onClick={() => openModal('showImageImportModal')}>Importer image</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showViewImagesModal')}>Voir les images</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showExportImageModal')}>Exporter en .img.mdlc</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => openModal('showImportImageModal')}>Importer en .img.mdlc</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        <Routes>
          <Route path='/markdown' element={<Markdown markdown={markdown} setMarkdown={setMarkdown} blocks={blocks} shortcuts={shortcuts} />} />
          <Route path='/test' element={<CompanyComponent />} />
        </Routes>

        {/* Modales */}
        <ViewBlocks blocks={blocks} removeBlock={removeBlock} isOpen={modalState.showViewBlocksModal} onRequestClose={() => closeModal('showViewBlocksModal')} />
        <AddBlock addBlock={addBlock} isOpen={modalState.showAddBlockModal} onRequestClose={() => closeModal('showAddBlockModal')} />
        <ImportBlocksModal isOpen={modalState.showImportBlocksModal} onRequestClose={() => closeModal('showImportBlocksModal')} />
        <ExportBlocksModal isOpen={modalState.showExportBlocksModal} onRequestClose={() => closeModal('showExportBlocksModal')} />
        <ViewShortcuts shortcuts={shortcuts} updateShortcut={updateShortcut} removeShortcut={removeShortcut} isOpen={modalState.showViewShortcutsModal} onRequestClose={() => closeModal('showViewShortcutsModal')} />
        <AddShortcut blocks={blocks} addShortcut={addShortcut} isOpen={modalState.showAddShortcutModal} onRequestClose={() => closeModal('showAddShortcutModal')} />
        <ImageImportModal isOpen={modalState.showImageImportModal} onRequestClose={() => closeModal('showImageImportModal')} />
        <ViewImagesModal
          isOpen={modalState.showViewImagesModal}
          onRequestClose={() => closeModal('showViewImagesModal')}
          onInsertImage={handleInsertImage}  // Assurez-vous que cette prop est bien passée
        />
        <ExportBlocksModal isOpen={modalState.showExportBlocksModal} onRequestClose={() => closeModal('showExportBlocksModal')} /> 
        <ImportBlocksModal isOpen={modalState.showImportBlocksModal} onRequestClose={() => closeModal('showImportBlocksModal')} /> 

        {/* Modal for Markdown file actions */}
        <MarkdownFileActions
          isOpen={modalState.showImportModal || modalState.showExportModal}
          onRequestClose={() => closeModal(modalState.showImportModal ? 'showImportModal' : 'showExportModal')}
          action={{
            type: modalState.showImportModal ? 'import' : 'export',
            markdown: markdown,
          }}
          onImport={(content) => setMarkdown(content)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
