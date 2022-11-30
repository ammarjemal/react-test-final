import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/sidebar-image.svg';
import Card from '../components/UI/Card';
import { ListNested, ListTask, PencilSquare, PlusLg, Trash } from 'react-bootstrap-icons';

const HomePage = () => {
  return (
    <div className='w-full h-screen flex'>
        <div className='flex items-center w-1/2 h-full'>
            <img className='w-full object-cover' src={image} alt='Employees'/>
        </div>
        <div className={`w-1/2 h-full flex justify-center items-center`}>
            <Card className='bg-slate-50 w-[300px] p-5'>
                <h1 className='text-lg font-semibold text-center my-2'>Choose an action</h1>
                <ul className='mt-4'>
                    <li className="my-2 pb-2 border-b">
                        <Link className='hover:text-sky-600' to='/add-department'>
                            <span className='flex items-center'><PlusLg className='mr-2'/>Add department</span>
                        </Link>
                    </li>
                    <li className="my-2 pb-2 border-b">
                        <Link className='hover:text-sky-600' to='/update-department'>
                            <span className='flex items-center'><PencilSquare className='mr-2'/>Update department</span>
                        </Link>
                    </li>
                    <li className="my-2 pb-2 border-b">
                        <Link className='hover:text-sky-600' to='/delete-department'>
                            <span className='flex items-center'><Trash className='mr-2'/>Delete department</span>
                        </Link>
                    </li>
                    <li className="my-2 pb-2 border-b">
                        <Link className='active:text-sky-500 hover:text-sky-600' to='/display-department'>
                            <span className='flex items-center'><ListTask className='mr-2'/>Display a single department</span>
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link className='hover:text-sky-600' to='/department-tree'>
                            <span className='flex items-center'><ListNested className='mr-2'/>Display all departments</span>
                        </Link>
                    </li>
                </ul>
            </Card>
        </div>
    </div>
  )
}

export default HomePage;