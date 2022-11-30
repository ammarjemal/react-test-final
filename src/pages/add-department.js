import React, { Fragment, useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Spinner from '../components/UI/Spinner';
import useInput from "../hooks/use-input";
import { TreeSelect } from 'antd';
import { addDepartment, getTreeData } from '../methods/api';
import Message from '../components/UI/Message';
import './style.css';
const AddDepartmentPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [managedBy, setManagedBy] = useState(null);

  useEffect(() => {
    async function fetchData() {
        const data = await getTreeData({setError});
        setTreeData(data);
    }
    fetchData();
  }, []);

  // use input is a custom hook in "../hooks/use-input" to handle events and validation
  const {
    value: departmentName,
    isValid: departmentNameIsValid,
    isInvalid: departmentNameIsInValid,
    inputChangeHandler: departmentNameChangeHandler,
    inputBlurHandler: departmentNameBlurHandler,
    reset: departmentNameResetHandler
  } = useInput(value => value.trim() !== '');

  const {
      value: description,
      isValid: descriptionIsValid,
      isInvalid: descriptionIsInValid,
      inputChangeHandler: descriptionChangeHandler,
      inputBlurHandler: descriptionBlurHandler,
        reset: descriptionResetHandler
  } = useInput(value => value.trim() !== '');

  const resetHandler = () => {
    // reset the three fields
    departmentNameResetHandler();
    descriptionResetHandler();
    setManagedBy(null);
  }

  // form is valid if department and description are valid... 
  // The submit button is enabled/disabled based on this variable
  // Managed by is not checked if empty because a department might
  // not be managed by another Eg: CEO
  const formIsValid = departmentNameIsValid && descriptionIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const departmentData = {
      departmentName,
      description,
      managedBy: managedBy ? managedBy : null, //assign null if it has no parent department
    }
    if(!formIsValid){
      setError("Error occured while uploading");
      setIsSubmitting(false);
      return;
    }
    // method found in "../methods/api"
    addDepartment(departmentData, { setError, setIsSubmitting, setSuccess });
    resetHandler();
  }
  return (
    <Fragment>
      <div className='w-full h-screen flex justify-center items-center'>
        {/* Custom component in '../components/UI/Card' used as wrapper*/}
        <Card className='min-w-[350px]'>
          <h1 className='text-xl font-semibold text-center my-4'>Add a Department</h1>
          {/* Custom component in '../components/UI/Message' to show a success or error message*/}
          {(!error && success) && <Message type='success' show={true} message={success}/>}
          {(error && !success) && <Message type='error' show={true} message={error}/>}
          <form onSubmit={submitHandler} className='w-full flex flex-col'>
            {/* Custom component in '../components/UI/Input' with basic styling*/}
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
            {/* Imported from "antd" library to list already added departments... expects treeData from database*/}
            <TreeSelect
              showSearch
              value={managedBy}
              dropdownStyle={{backgroundColor: 'white', margin: '0.75rem 0', placeholder: 'rgb(107 114 128)', border: '1px solid rgb(209 213 219)', width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', maxHeight: 400, borderRadius: '12px', position: 'absolute', overflow: 'auto' }}
              placeholder="Please select a parent department"
              className={`treeSelect placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
              allowClear
              treeDefaultExpandAll
              onChange={setManagedBy}
              treeData={treeData}
            />
            {/* Custom component in "../UI/Button with basic styling*/}
            <div className='flex justify-between w-full'>
              <Button
                type="reset"
                onClick={resetHandler}
              >
                Reset
              </Button>
              <Button
                disabled={!formIsValid}
                type="submit"
                btnType="default"
              >
                {isSubmitting ? <Spinner/> : "Submit"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Fragment>
  )
}

export default AddDepartmentPage;