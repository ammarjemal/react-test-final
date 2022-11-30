import React, { useEffect, useState } from 'react'
import Message from '../UI/Message';
import { getTreeData } from '../methods/api';
import { Tree } from 'antd';
import Spinner from '../UI/Spinner';

const DisplayTreePage = () => {
  const [treeData, setTreeData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await getTreeData({setError});
      console.log(data);
      setTreeData(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <div className='flex items-center justify-center w-full h- h-screen'>
      {error && <Message type='error' show={true} message={error}/>}
      {(!isLoading && !treeData.length) && <p>No data found</p>}
      {(isLoading && !treeData.length) && <Spinner className='w-10 h-10' type='main'/>}
      <Tree
        showLine={true}
        showIcon={false}
        onSelect={onSelect}
        treeData={treeData}
        defaultExpandAllRows
      />
    </div>
  )
}

export default DisplayTreePage;