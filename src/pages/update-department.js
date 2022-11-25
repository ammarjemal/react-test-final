import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Spinner from '../UI/Spinner';
import useInput from "../hooks/use-input";
import { TreeSelect } from 'antd';
import { updateDepartment, searchDepartment, getTreeData } from '../methods/api';
import Message from '../UI/Message';
import { ObjectLength } from "../methods/extra-functions";

import './style.css';
const UpdateDepartmentPage = () => {
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
    }, []);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [searchDepartmentValue, setSearchDepartmentValue] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [description, setDescription] = useState("");
    const [managedBy, setManagedBy] = useState(null);
    const [departmentData, setDepartmentData] = useState({});

    const chooseDepartmentChangeHandler = async (value) => {
        setSearchDepartmentValue(value);
        const fetchedDepartmentData = await searchDepartment(value.trim());
        if(!ObjectLength(fetchedDepartmentData)){
            setError("No data found");
        }
        setDepartmentData(fetchedDepartmentData);
        setDepartmentId(fetchedDepartmentData.id);
        setDepartmentName(fetchedDepartmentData.departmentName);
        setDescription(fetchedDepartmentData.description);
        setManagedBy(fetchedDepartmentData.managedBy);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(!ObjectLength(departmentData)){
            setError("Cannot update department")
            return;
        }
        if(departmentName === '' || description === '' || managedBy === ''){
            setError("Fields cannot be empty")
            return;
        }
        setIsSubmitting(true);
        const updatedDepartmentData = {
            id: departmentId,
            departmentName,
            description,
            managedBy // parent department
        }
        updateDepartment(updatedDepartmentData, { setError, setIsSubmitting, setSuccess });
    }
    return (
        <Fragment>
            <div className='w-full h-screen flex justify-center items-center'>
                <Card className='min-w-[350px]'>
                    <h1 className='text-xl font-semibold text-center my-4'>Update a Department</h1>
                    {(!error && success) && <Message type='success' show={true} message={success}/>}
                    {(error && !success) && <Message type='error' show={true} message={error}/>}
                    <form onSubmit={submitHandler} className='w-full flex flex-col'>
                        {/* for the user to select a department and populate the fields */}
                        <TreeSelect
                            showSearch
                            value={searchDepartmentValue}
                            dropdownStyle={{backgroundColor: 'white', margin: '0.75rem 0', placeholder: 'rgb(107 114 128)', border: '1px solid rgb(209 213 219)', width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', maxHeight: 400, borderRadius: '12px', position: 'absolute', overflow: 'auto' }}
                            placeholder="Please select a department to update"
                            className={`treeSelect placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                            allowClear
                            treeDefaultExpandAll
                            onChange={chooseDepartmentChangeHandler}
                            treeData={treeData}
                        />
                        <hr/>
                        {/* the 3 fields below are filled by the data that is fetched */}
                        <Input
                            onChange={(e) => setDepartmentName(e.target.value)}
                            // onBlur={departmentNameBlurHandler}
                            value={departmentName}
                            id="departmentName"
                            type="text"
                            // isInvalid={departmentNameIsInValid}
                            placeholder="Deparment name"
                            autoComplete='departmentName'
                        />
                        <Input
                            onChange={(e) => setDescription(e.target.value)}
                            // onBlur={descriptionBlurHandler}
                            value={description}
                            id="description"
                            type="text"
                            // isInvalid={descriptionIsInValid}
                            placeholder="Description"
                            autoComplete='description'
                        />
                        <TreeSelect
                            showSearch
                            value={managedBy}
                            dropdownStyle={{backgroundColor: 'white', margin: '0.75rem 0', placeholder: 'rgb(107 114 128)', border: '1px solid rgb(209 213 219)', width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', maxHeight: 400, borderRadius: '12px', position: 'absolute', overflow: 'auto' }}
                            placeholder="Please select a department"
                            className={`treeSelect placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                            allowClear
                            treeDefaultExpandAll
                            onChange={setManagedBy}
                            treeData={treeData}
                        />
                        {/* {ObjectLength(departmentData) && <p>Data exist</p>} */}
                        <Button
                            // disabled={(!formIsValid && !ObjectLength(departmentData))}
                            // disabled={(!ObjectLength(departmentData))}
                            className='self-end'
                            type="submit"
                        >
                            {isSubmitting ? <Spinner/> : "Update"}
                        </Button>
                    </form>
                </Card>
            </div>
        </Fragment>
    )
}

export default UpdateDepartmentPage;