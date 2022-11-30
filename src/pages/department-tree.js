import React, { Fragment, useEffect, useState } from 'react'
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
    <Fragment>
      <h1 className='font-bold text-2xl text-center my-20'>Management Heirarchy</h1>
      <div className='flex flex-col items-center justify-center w-full h-fit'>
        {/* Custom component in '../components/UI/Message' to show a success or error message*/}
        {error && <Message type='error' show={true} message={error}/>}
        {(!isLoading && !treeData.length) && <p>No data found</p>}
        {/* Custom component in '../components/UI/Spinner' to show loading state*/}
        {(isLoading && !treeData.length) && <Spinner className='w-10 h-10' type='main'/>}
        {/* <div className='text-2xl'> */}
          <Tree
            style={{fontSize: "1.2em"}}
            showLine={true}
            showIcon={false}
            treeData={treeData}
            defaultExpandAllRows
            />
        {/* </div> */}
      </div>
    </Fragment>
  )
}

export default DisplayTreePage;