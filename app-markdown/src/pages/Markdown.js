import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import FileTree from '../components/FileTree';
import ContextMenu from '../components/ContextMenu';

function Markdown() {
    const [files, setFiles] = useState([]);
    const [contextMenuPosition, setContextMenuPosition] = useState(null);

    const handleNewItem = (type, name) => {
        const newItem = { name, children: type === 'folder' ? [] : undefined };
        setFiles([...files, newItem]);
        setContextMenuPosition(null); // Ferme le menu contextuel
    };

    const handleContextMenu = (x, y) => {
        setContextMenuPosition({ x, y });
    };

    return (
        <HelmetProvider>
            <div style={{ display: 'flex' }}>
                <Helmet>
                    <title>Markdown - Visualisation</title>
                </Helmet>

                {/* Section de l'arborescence des fichiers */}
                <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
                    <h3>Arborescence</h3>
                    <FileTree files={files} onNewFileOrFolder={handleContextMenu} />
                </div>

                {/* Affiche le menu contextuel */}
                {contextMenuPosition && (
                    <ContextMenu
                        onNewItem={handleNewItem}
                        style={{
                            top: contextMenuPosition.y,
                            left: contextMenuPosition.x,
                        }}
                    />
                )}

                {/* Section principale */}
                <div style={{ flex: 1, padding: '10px' }}>
                    <h3>Bienvenue dans l'éditeur Markdown</h3>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default Markdown;
