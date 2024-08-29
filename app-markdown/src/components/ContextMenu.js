import React from 'react';

const ContextMenu = ({ onNewItem, style }) => {
    const handleNewFile = () => {
        const fileName = prompt("Nom du nouveau fichier:");
        if (fileName) {
            onNewItem('file', fileName);
        }
    };

    const handleNewFolder = () => {
        const folderName = prompt("Nom du nouveau dossier:");
        if (folderName) {
            onNewItem('folder', folderName);
        }
    };

    return (
        <div 
            style={{
                position: 'absolute',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                ...style,
            }}
        >
            <div onClick={handleNewFile}>
                Nouveau fichier
            </div>
            <div onClick={handleNewFolder}>
                Nouveau dossier
            </div>
        </div>
    );
};

export default ContextMenu;
