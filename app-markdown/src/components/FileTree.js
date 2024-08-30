import React, { useState, useEffect } from 'react';
import { Treebeard } from 'react-treebeard';

const FileTree = ({ files, onContextMenu }) => {
    const [data, setData] = useState({
        id: 'root',
        name: 'root',
        toggled: true,
        children: [],
    });

    useEffect(() => {
        setData({
            id: 'root',
            name: 'root',
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

    const NodeWrapper = ({ node, children }) => {
        const handleContextMenu = (event) => {
            event.preventDefault();
            onContextMenu(event.clientX, event.clientY, node);
        };

        return (
            <div onContextMenu={handleContextMenu}>
                {children}
            </div>
        );
    };

    const customDecorators = {
        ...Treebeard.defaultProps.decorators,
        Container: (props) => (
            <NodeWrapper node={props.node}>
                <Treebeard.defaultProps.decorators.Container {...props} />
            </NodeWrapper>
        ),
        Header: (props) => (
            <div>
                {props.node.type === 'folder' ? '📁' : '📄'} {/* Ajouter des icônes */}
                {props.node.name}
            </div>
        ),
    };

    return (
        <div>
            <Treebeard
                data={data}
                onToggle={onToggle}
                decorators={customDecorators}
            />
        </div>
    );
};

export default FileTree;
