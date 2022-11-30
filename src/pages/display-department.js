import React, { Fragment, useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import { TreeSelect } from 'antd';
import { searchDepartment, getChildren, getTreeData } from '../methods/api';
import './style.css';
import Message from '../components/UI/Message';
const DisplayDepartmentPage = () => {
    const [treeData, setTreeData] = useState([]);
    const [showParent, setShowParent] = useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const [error, setError] = useState(null);
    const [departmentData, setDepartmentData] = useState({children: []});
    const [searchDepartmentValue, setSearchDepartmentValue] = useState(null);
    const [childrenList, setChildrenList] = useState("");
    
    useEffect(() => {
        async function fetchData() {
            const data = await getTreeData({setError});
            setTreeData(data);
        }
        fetchData();
    }, []);

    const chooseDepartmentChangeHandler = async (value) => {
        setSearchDepartmentValue(value)
        const fetchedDepartmentData = await searchDepartment(value.trim(), {setError});
        const children = await getChildren(value.trim(), {setError});
        setDepartmentData({
            ...fetchedDepartmentData,
            children
        });
        let childrenList = "";
        for(let i=0; i < children.length; i++){
            childrenList = childrenList + children[i].departmentName + " : ";
        }
        childrenList = childrenList.slice(0, -3);
        setChildrenList(childrenList);
    }
    return (
        <Fragment>
            <div className='w-full h-screen flex justify-center items-center'>
                {/* Custom component in '../components/UI/Card' used as wrapper*/}
                <Card className='min-w-[350px]'>
                    <h1 className='text-xl font-semibold text-center my-4'>Display a Department</h1>
                        {/* Custom component in '../components/UI/Message' to show a success or error message*/}
                        {error && <Message type='error' show={true} setState={setError} message={error}/>}
                        {/* for the user to select a department and fetch department data */}
                        <TreeSelect
                            showSearch
                            value={searchDepartmentValue}
                            dropdownStyle={{backgroundColor: 'white', margin: '0.75rem 0', placeholder: 'rgb(107 114 128)', border: '1px solid rgb(209 213 219)', width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', maxHeight: 400, borderRadius: '12px', position: 'absolute', overflow: 'auto' }}
                            placeholder="Please select a department to update"
                            className={`w-full treeSelect placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                            allowClear
                            treeDefaultExpandAll
                            onChange={chooseDepartmentChangeHandler}
                            treeData={treeData}
                        />
                        {departmentData && <div className='department-data'>
                            <ul>
                                <li className='mt-3'><span className='font-semibold mr-2'>Department name:</span>{departmentData.departmentName}</li>
                                <li className='mt-3'><span className='font-semibold mr-2'>Description:</span>{departmentData.description}</li>
                                <li className='mt-3'>
                                    <span className='flex items-center font-semibold mr-2'>
                                        Managing department:
                                        <button className='hover:bg-slate-300 bg-slate-200 text-sm rounded-md ml-2 p-1'
                                            onClick={() => {
                                                setShowParent(!showParent) // opposite to previous state
                                            }}>
                                            {showParent ? "Hide" : "Show"}
                                        </button>
                                    </span>
                                    {showParent && <span>{departmentData.managedBy ? departmentData.managedBy : "None"}</span>}
                                </li>
                                <li className='mt-3'>
                                    <span className='flex items-center font-semibold mr-2'>
                                        Departments under its management:
                                        <button className='hover:bg-slate-300 bg-slate-200 text-sm rounded-md ml-2 p-1'
                                            onClick={() => {
                                                setShowChildren(!showChildren)
                                            }}>
                                            {showChildren ? "Hide" : "Show"}
                                        </button>
                                    </span>
                                    {showChildren &&
                                        <span>
                                            {childrenList}
                                            {(showChildren && !departmentData.children.length) && <span>None</span>}
                                        </span>
                                    }
                                </li>
                            </ul>
                        </div>}
                </Card>
            </div>
        </Fragment>
    )
}

export default DisplayDepartmentPage;
