import React, { useEffect, useState } from 'react'
import Message from '../components/UI/Message';
import { getTreeData } from '../methods/api';
import { Tree } from 'antd';
import Spinner from '../components/UI/Spinner';

const DisplayTreePage = () => {
  const [treeData, setTreeData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await getTreeData({setError});
      setTreeData(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className='flex items-center justify-center w-full h- h-screen'>
      {/* Custom component in '../components/UI/Message' to show a success or error message*/}
      {error && <Message type='error' show={true} message={error}/>}
      {(!isLoading && !treeData.length) && <p>No data found</p>}
      {/* Custom component in '../components/UI/Spinner' to show loading state*/}
      {(isLoading && !treeData.length) && <Spinner className='w-10 h-10' type='main'/>}
      <Tree
        showLine={true}
        showIcon={false}
        treeData={treeData}
        defaultExpandAllRows
      />
    </div>
  )
}

export default DisplayTreePage;