// Markdown.js
import React, { useState, useEffect, useRef } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import FileActions from '../components/MarkdownFileActions';
import FileTree from '../components/FileTree';
import ContextMenu from '../components/ContextMenu';
import { useDispatch } from 'react-redux';
import { renommerFichier, supprimerFichier, ajouterFichier } from '../store/features/localstorage';

function Markdown({ markdown, setMarkdown, blocks }) {
    const [files, setFiles] = useState([]);
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (markdown === '') {
                setMarkdown("# Hello World!");
            }
        }
    }, [markdown, setMarkdown]);

    const handleMarkdownChange = (value) => {
        setMarkdown(value);
    };

    const handleFileImport = (content) => {
        setMarkdown(content);
    };

    const handleNewItem = (type, name) => {
        const newItem = { id: Date.now(), name, type, children: [] };

        if (selectedNode) {
            if (!Array.isArray(selectedNode.children)) {
                selectedNode.children = [];
            }
            selectedNode.children.push(newItem);
            setFiles([...files]); // Mettre à jour l'état des fichiers
            dispatch(ajouterFichier(newItem, selectedNode.id)); // Mettre à jour le store
        } else {
            setFiles([...files, newItem]);
            dispatch(ajouterFichier(newItem)); // Ajouter à la racine
        }
        setContextMenuPosition(null);
    };

    const handleRename = (newName) => {
        if (selectedNode) {
            dispatch(renommerFichier({ id: selectedNode.id, newName }));
            setFiles(files.map(file => file.id === selectedNode.id ? { ...file, name: newName } : file));
        }
        setContextMenuPosition(null);
    };

    const handleDelete = () => {
        if (selectedNode) {
            dispatch(supprimerFichier(selectedNode.id));
            const removeFile = (id, items) => items.filter(item => {
                if (item.id === id) return false;
                if (item.children) item.children = removeFile(id, item.children);
                return true;
            });

            setFiles(removeFile(selectedNode.id, files));
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
                    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
                        <h3>Fichiers</h3>
                        <FileTree files={files} onContextMenu={handleContextMenu} />
                    </div>

                    {contextMenuPosition && (
                        <ContextMenu
                            onNewItem={handleNewItem}
                            onRename={handleRename}
                            onDelete={handleDelete}
                            style={{
                                top: contextMenuPosition.y,
                                left: contextMenuPosition.x,
                            }}
                            isFolder={selectedNode && selectedNode.type === 'folder'}
                            isRoot={!selectedNode || selectedNode.id === 'root'}
                        />
                    )}

                    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                        <h3>Bienvenue dans l'éditeur Markdown</h3>
                        <div style={{ display: 'flex', flex: 1 }}>
                            <Editor markdown={markdown} onMarkdownChange={handleMarkdownChange} blocks={blocks} />
                            <Preview markdown={markdown} />
                        </div>
                    </div>
                </div>

                <FileActions markdown={markdown} onFileImport={handleFileImport} />
            </div>
        </HelmetProvider>
    );
}

export default Markdown;