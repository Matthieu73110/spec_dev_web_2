import React from 'react';

const ContextMenu = ({ onNewItem, onRename, onDelete, style, isFolder, isRoot }) => {
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
            {isFolder || isRoot ? (
                <div onClick={handleNewFile}>
                    Nouveau fichier
                </div>
            ) : null}
            {isFolder || isRoot ? (
                <div onClick={handleNewFolder}>
                    Nouveau dossier
                </div>
            ) : null}
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
