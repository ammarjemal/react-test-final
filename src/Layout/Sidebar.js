import React from 'react'
import { House, ListNested, ListTask, PencilSquare, PlusLg, Trash } from 'react-bootstrap-icons';
import { NavLink } from "react-router-dom";
import sidebarImg from "../assets/sidebar-image.svg";
import user from "../assets/user.jpg";
// sidebar component found in the pages
const Sidebar = () => {
  return (
    <div className="sidebar overflow-y-hidden flex flex-col justify-between p-4 bg-slate-100 min-w-[300px] max-w-[400px] h-screen left-0">
        <div className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl text-center'>Welcome</h2>
            <img src={user} alt='Not found' className='mt-2 rounded-full w-20 h-20'/>
        </div>
        <ul className="text-gray-700 justify-self-center my-5">
            <li className="my-2 pb-2 border-b">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-600' to='/' exact>
                    <span className='flex items-center'><House className='mr-2'/>Home</span>
                </NavLink>
            </li>
            <li className="my-2 pb-2 border-b">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-600' to='/add-department'>
                    <span className='flex items-center'><PlusLg className='mr-2'/>Add department</span>
                </NavLink>
            </li>
            <li className="my-2 pb-2 border-b">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-600' to='/update-department'>
                    <span className='flex items-center'><PencilSquare className='mr-2'/>Update department</span>
                </NavLink>
            </li>
            <li className="my-2 pb-2 border-b">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-600' to='/delete-department'>
                    <span className='flex items-center'><Trash className='mr-2'/>Delete department</span>
                </NavLink>
            </li>
            <li className="my-2 pb-2 border-b">
                <NavLink activeClassName="text-sky-500" className='active:text-sky-500 hover:text-sky-600' to='/display-department'>
                    <span className='flex items-center'><ListTask className='mr-2'/>Display a single department</span>
                </NavLink>
            </li>
            <li className="my-2">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-600' to='/department-tree'>
                    <span className='flex items-center'><ListNested className='mr-2'/>Display all departments</span>
                </NavLink>
            </li>
        </ul>
        <img className='w-[300px]' alt='Not found' src={sidebarImg}/>
    </div>
  )
}

export default Sidebar;