import React, { useEffect, useState } from 'react'
import Message from '../UI/Message';
import { getTreeData } from '../methods/api';
import { Tree } from 'antd';

const DisplayTreePage = () => {
  const [treeData, setTreeData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      async function fetchData() {
          const data = await getTreeData({setError});
          setTreeData(data);
      }
      fetchData();
  }, []);
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <div className='flex items-center justify-center w-full h- h-screen'>
       {error && <Message type='error' show={true} message={error}/>}
      <Tree
        showLine={true}
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  )
}

export default DisplayTreePage;