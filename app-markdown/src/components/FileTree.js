import React, { useState, useEffect } from 'react';
import { Treebeard } from 'react-treebeard';

const FileTree = ({ files, onNewFileOrFolder }) => {
    const [data, setData] = useState({
        name: 'markdownFiles',
        toggled: true,
        children: files,
    });

    useEffect(() => {
        setData({
            name: 'markdownFiles',
            toggled: true,
            children: files,
        });
    }, [files]);

    const onToggle = (node, toggled) => {
        if (node.children) {
            node.toggled = toggled;
        }
        setData({ ...data });
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        onNewFileOrFolder(event.clientX, event.clientY);
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <Treebeard data={data} onToggle={onToggle} />
        </div>
    );
};

export default FileTree;
