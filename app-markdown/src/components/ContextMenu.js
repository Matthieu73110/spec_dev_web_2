import React from 'react';

const ContextMenu = ({ onNewItem, onRename, onDelete, style }) => {
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

    const handleRename = () => {
        const newName = prompt("Nouveau nom:");
        if (newName) {
            onRename(newName);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
            onDelete();
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
            <div onClick={handleRename}>
                Renommer
            </div>
            <div onClick={handleDelete}>
                Supprimer
            </div>
        </div>
    );
};

export default ContextMenu;
