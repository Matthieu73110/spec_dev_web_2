// Markdown.js
import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import FileActions from '../components/FileActions';
import FileTree from '../components/FileTree';
import ContextMenu from '../components/ContextMenu';
import { useDispatch } from 'react-redux';
import { renommerFichier, supprimerFichier, ajouterFichier } from '../store/features/localstorage';

function Markdown() {
    const [markdown, setMarkdown] = useState("# Hello World!");
    const [files, setFiles] = useState([]);
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const dispatch = useDispatch();

    const handleMarkdownChange = (value) => {
        setMarkdown(value);
    };

    const handleFileImport = (content) => {
        setMarkdown(content);
    };

    const handleNewItem = (type, name) => {
        const newItem = { id: Date.now(), name, type, children: [] };
        if (selectedNode) {
            // Ajouter le fichier ou le dossier dans le dossier sélectionné
            if (!Array.isArray(selectedNode.children)) {
                selectedNode.children = [];
            }
            selectedNode.children.push(newItem);
            // Mettre à jour l'état des fichiers
            setFiles([...files]);
            // Mettre à jour le store
            dispatch(ajouterFichier(newItem, selectedNode.id));
        } else {
            // Ajouter à la racine
            setFiles([...files, newItem]);
            dispatch(ajouterFichier(newItem));
        }
        setContextMenuPosition(null);
    };

    const handleRename = (newName) => {
        if (selectedNode) {
            dispatch(renommerFichier({ id: selectedNode.id, newName }));
        }
        setContextMenuPosition(null);
    };

    const handleDelete = () => {
        if (selectedNode) {
            dispatch(supprimerFichier(selectedNode.id));
            setFiles(files.filter(file => file.id !== selectedNode.id));
            setSelectedNode(null);
        }
        setContextMenuPosition(null);
    };

    const handleContextMenu = (x, y, node) => {
        setSelectedNode(node);
        setContextMenuPosition({ x, y });
    };

    return (
        <HelmetProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Helmet>
                    <title>Markdown - Visualisation</title>
                </Helmet>

                <div style={{ display: 'flex', flex: 1 }}>
                    {/* Section de l'arborescence des fichiers */}
                    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
                        <h3>Fichiers</h3>
                        <FileTree files={files} onContextMenu={handleContextMenu} />
                    </div>

                    {/* Affiche le menu contextuel */}
                    {contextMenuPosition && (
                        <ContextMenu
                            onNewItem={handleNewItem}
                            onRename={handleRename}
                            onDelete={handleDelete}
                            style={{
                                top: contextMenuPosition.y,
                                left: contextMenuPosition.x,
                            }}
                        />
                    )}

                    {/* Section principale */}
                    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                        <h3>Bienvenue dans l'éditeur Markdown</h3>

                        {/* Contenu de l'éditeur et de l'aperçu */}
                        <div style={{ display: 'flex', flex: 1 }}>
                            <Editor markdown={markdown} onMarkdownChange={handleMarkdownChange} />
                            <Preview markdown={markdown} />
                        </div>
                    </div>
                </div>

                {/* Actions liées aux fichiers */}
                <FileActions markdown={markdown} onFileImport={handleFileImport} />
            </div>
        </HelmetProvider>
    );
}

export default Markdown;
