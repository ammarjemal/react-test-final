import React, { useEffect, useState } from 'react'
import { getTreeData } from '../methods/api'

const DisplayTreePage = () => {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    setTreeData(getTreeData());
  },[])
  return (
    <div>DisplayTreePage</div>
  )
}

export default DisplayTreePage;