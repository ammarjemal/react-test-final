import React, { Fragment, useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Spinner from '../components/UI/Spinner';
import { TreeSelect } from 'antd';
import { deleteDepartment, getTreeData } from '../methods/api';
import Message from '../components/UI/Message';
import './style.css';
import { Modal } from '../components/UI/Modal';
const AddDepartmentPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [departmentName, setDepartmentName] = useState(null);
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const data = await getTreeData({setError});
        setTreeData(data);
    }
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setModalShown(true);
  }
  const cancelClickHandler = () => {
    setModalShown(false);
  }
  const deleteClickHandler = () => {
    setIsSubmitting(true);
    if(!departmentName){
      setError("Please select a department");
      setIsSubmitting(false);
      return;
    }
    setModalShown(false);
    // method found in "../methods/api"
    deleteDepartment(departmentName, { setError, setIsSubmitting, setSuccess });
    setDepartmentName(null);
  }
  return (
    <Fragment>
      <div className='w-full h-screen flex justify-center items-center'>
        {/* Custom component in '../components/UI/Modal' used as for confirmation message*/}
        {modalShown && <Modal onClick={deleteClickHandler} onCancel={cancelClickHandler}/>}
        {/* Custom component in '../components/UI/Card' used as wrapper*/}
        <Card className='min-w-[350px]'>
          <h1 className='text-xl font-semibold text-center my-4'>Delete a Department</h1>
          {/* Custom component in '../components/UI/Message' to show a success or error message*/}
          {(!error && success) && <Message type='success' show={true} message={success}/>}
          {(error && !success) && <Message type='error' show={true} message={error}/>}
          <form onSubmit={submitHandler} className='w-full flex flex-col'>
            {/* Imported from "antd" library to list already added departments... expects treeData from database*/}
            <TreeSelect
              showSearch
              value={departmentName}
              dropdownStyle={{backgroundColor: 'white', margin: '0.75rem 0', placeholder: 'rgb(107 114 128)', border: '1px solid rgb(209 213 219)', width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', maxHeight: 400, borderRadius: '12px', position: 'absolute', overflow: 'auto' }}
              placeholder="Please select a parent department"
              className={`treeSelect placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
              allowClear
              treeDefaultExpandAll
              onChange={setDepartmentName}
              treeData={treeData}
            />
            {/* Custom component in "../UI/Button with basic styling*/}
            <Button
              disabled={!departmentName}
              type="submit"
              btnType="default"
            >
              {isSubmitting ? <Spinner/> : "Delete"}
            </Button>
          </form>
        </Card>
      </div>
    </Fragment>
  )
}

export default AddDepartmentPage;