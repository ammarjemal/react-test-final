import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Spinner from '../UI/Spinner';
import useInput from "../hooks/use-input";
import { TreeSelect } from 'antd';
import { updateDepartment, searchDepartment, getChildren, getTreeData } from '../methods/api';
import Toast from '../UI/Message';
import './style.css';
import Message from '../UI/Message';
const DisplayDepartmentPage = () => {
    const treeData = [
        {
        value: 'CEO',
        title: 'CEO',
        children: [
            {
            value: 'CFO',
            title: 'CFO',
            children: [
                {
                value: 'Finantial analyst',
                title: 'Finantial analyst',
                },
                {
                value: 'Auditors',
                title: 'Auditors',
                },
            ],
            },
            {
            value: 'CMO',
            title: 'CMO',
            children: [
                {
                value: 'X',
                title: 'X',
                },
            ],
            },
        ],
        },
    ];
    useEffect(() => {
        getTreeData({setError});
    }, [])
    
    const [showParent, setShowParent] = useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const [error, setError] = useState(null);
    const [departmentData, setDepartmentData] = useState({});
    const [searchDepartmentValue, setSearchDepartmentValue] = useState(null);
    
    const chooseDepartmentChangeHandler = async (value) => {
        console.log(value);
        setSearchDepartmentValue(value)
        const fetchedDepartmentData = await searchDepartment(value.trim());
        const children = await getChildren(value.trim());
        console.log({...fetchedDepartmentData,
            children}
        );
        setDepartmentData({
            ...fetchedDepartmentData,
            children
        });
    }
    return (
        <Fragment>
            <div className='w-full h-screen flex justify-center items-center'>
                <Card className='min-w-[350px]'>
                    <h1 className='text-xl font-semibold text-center my-4'>Display a Department</h1>
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
                                    <button className='block underline' onClick={() => {setShowParent(!showParent)}}>{showParent ? "Hide" : "Show"} managing department</button>
                                    {showParent && <li><span className='font-semibold mr-2'>Managing department:</span>{departmentData.managedBy ? departmentData.managedBy : "None"}</li>}
                                </li>
                                <li className='mt-3'>
                                    <button className='block underline' onClick={() => {setShowChildren(!showChildren)}}>{showChildren ? "Hide" : "Show"} departments under its management</button>
                                    {showChildren && <li><span className='font-semibold mr-2'>Departments under its management:</span>
                                    {
                                        departmentData.children.map(child => (
                                            <span key={child.id}> : {child.departmentName}</span>
                                        ))
                                    }
                                    </li>}
                                </li>
                                
                            </ul>
                        </div>}
                </Card>
            </div>
        </Fragment>
    )
}

export default DisplayDepartmentPage;