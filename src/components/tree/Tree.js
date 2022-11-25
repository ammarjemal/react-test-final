import React from 'react';
import Tree from 'react-d3-tree';

const FullTree = ({treeData}) => {
    return (
        <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
            <Tree data={treeData} />
        </div>
    );
}

export default FullTree;