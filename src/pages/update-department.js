import React, { Fragment, useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Spinner from '../components/UI/Spinner';
import Message from '../components/UI/Message';
import useInput from '../hooks/use-input';
import { TreeSelect } from 'antd';
import { updateDepartment, searchDepartment, getTreeData } from '../methods/api';
import { ObjectLength } from "../methods/extra-functions";

import './style.css';
const UpdateDepartmentPage = () => {
    const [treeData, setTreeData] = useState([]); //holds the tree data for TreeSelect
    const [isSubmitting, setIsSubmitting] = useState(false); // loading state
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [searchDepartmentValue, setSearchDepartmentValue] = useState(null); //holds selected department from TreeSelect
    const [departmentId, setDepartmentId] = useState(null);
    const [managedBy, setManagedBy] = useState(null);
    const [departmentData, setDepartmentData] = useState({}); // object to hold the searched result

    const {
        value: departmentName,
        isValid: departmentNameIsValid,
        isInvalid: departmentNameIsInValid,
        inputChangeHandler: departmentNameChangeHandler,
        inputBlurHandler: departmentNameBlurHandler,
      } = useInput(value => value.trim() !== '');

      const {
        value: description,
        isValid: descriptionIsValid,
        isInvalid: descriptionIsInValid,
        inputChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput(value => value.trim() !== '');

    const formIsValid = departmentNameIsValid && descriptionIsValid;

    useEffect(() => {
        async function fetchData() {
            // function found in "../methods/api" to fetch all departments according to their heirarchy
            const data = await getTreeData({setError});
            setTreeData(data);
        }
        fetchData();
    }, []);
    
    const chooseDepartmentChangeHandler = async (value) => {
        setSearchDepartmentValue(value);
        const fetchedDepartmentData = await searchDepartment(value.trim(),{setError});
        
        setDepartmentData(fetchedDepartmentData);
        setDepartmentId(fetchedDepartmentData.id);
        setManagedBy(fetchedDepartmentData.managedBy);
        
        // handler functions inside useInput hook
        departmentNameChangeHandler(fetchedDepartmentData.departmentName);
        descriptionChangeHandler(fetchedDepartmentData.description);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(!ObjectLength(departmentData)){
            setError("Cannot update department")
            return;
        }
        if(departmentName === '' || description === ''){
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
        updateDepartment(updatedDepartmentData, searchDepartmentValue, { setError, setIsSubmitting, setSuccess });
    }
    return (
        <Fragment>
            <div className='w-full h-screen flex justify-center items-center'>
                {/* Custom component in '../components/UI/Card' used as wrapper*/}
                <Card className='min-w-[350px]'>
                    <h1 className='text-xl font-semibold text-center my-4'>Update a Department</h1>
                    {/* Custom component in '../components/UI/Message' to show a success or error message*/}
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
                        {/* --------------------------------------------- */}
                        {/* Custom component in '../component/UI/Input' with basic styling*/}
                        <Input
                            onChange={departmentNameChangeHandler}
                            onBlur={departmentNameBlurHandler}
                            value={departmentName}
                            id="departmentName"
                            type="text"
                            isInvalid={departmentNameIsInValid}
                            placeholder="Deparment name"
                            autoComplete='departmentName'
                        />
                        <Input
                            onChange={descriptionChangeHandler}
                            onBlur={descriptionBlurHandler}
                            value={description}
                            id="description"
                            type="text"
                            isInvalid={descriptionIsInValid}
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
                        <Button
                            disabled={(!ObjectLength(departmentData) || !formIsValid)}
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