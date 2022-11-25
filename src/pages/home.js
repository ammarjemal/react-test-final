import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/employees.jpg';
import Card from '../UI/Card';
const HomePage = () => {
  return (
    <div className='w-full h-screen flex'>
        <img className='w-1/2 h-full object-cover' src={image} alt='Employees'/>
        <div className={`w-full h-full flex justify-center items-center`}>
            <Card className='bg-slate-50 w-[300px] p-5'>
                <h1 className='text-lg font-semibold text-center my-2'>Choose an action</h1>
                <ul>
                    <li>
                        <Link className='text-sky-500 hover:text-sky-600 active:text-sky-700 focus:text-sky-700' to='/add-department'>
                            Add department
                        </Link>
                    </li>
                    <li>
                        <Link className='text-sky-500 hover:text-sky-600 active:text-sky-700 focus:text-sky-700' to='/update-department'>
                            Update department
                        </Link>
                    </li>
                    <li>
                        <Link className='text-sky-500 hover:text-sky-600 active:text-sky-700 focus:text-sky-700' to='/display-department'>
                            Display a single department
                        </Link>
                    </li>
                    <li>
                        <Link className='text-sky-500 hover:text-sky-600 active:text-sky-700 focus:text-sky-700' to='/department-tree'>
                            Display all departments
                        </Link>
                    </li>
                </ul>
            </Card>
        </div>
    </div>
  )
}

export default HomePage;