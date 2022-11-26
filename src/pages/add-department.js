import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Spinner from '../UI/Spinner';
import useInput from "../hooks/use-input";
import { TreeSelect } from 'antd';
import { addDepartment, getTreeData } from '../methods/api';
import Message from '../UI/Message';
import './style.css';
const AddDepartmentPage = () => {
  const [isSubmitting, setIsSubmitting]=useState(false);
  const [error, setError]=useState(null);
  const [success, setSuccess] = useState(null);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const data = await getTreeData({setError});
        setTreeData(data);
    }
    fetchData();
  }, []);

  // use input is a custom hook
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

  const [managedBy, setManagedBy] = useState(null);

  // form is valid if department and description are valid... 
  // The submit button is enabled/disabled based on this variable
  // Managed by is not checked if empty because a department might
  // not be managed by another such as CEO
  const formIsValid = departmentNameIsValid && descriptionIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const departmentData = {
      departmentName,
      description,
      managedBy, // parent department
      // children: []
    }
    // in case the user enabled the submit button
    if(!formIsValid){
      setError("Error occured while uploading");
      return;
    }
    addDepartment(departmentData, { setError, setIsSubmitting, setSuccess });
  }
  return (
    <Fragment>
      {/* {error && <Toast type='error' show={true} setState={setError} message={error}/>} */}
      <div className='w-full h-screen flex justify-center items-center'>
        <Card className='min-w-[350px]'>
          <h1 className='text-xl font-semibold text-center my-4'>Add a Department</h1>
          {(!error && success) && <Message type='success' show={true} message={success}/>}
          {(error && !success) && <Message type='error' show={true} message={error}/>}
          <form onSubmit={submitHandler} className='w-full flex flex-col'>
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
              disabled={!formIsValid}
              className='self-end'
              type="submit"
            >
              {isSubmitting ? <Spinner/> : "Submit"}
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  )
}

export default AddDepartmentPage;
