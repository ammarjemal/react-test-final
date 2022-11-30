import React from 'react'
import { NavLink } from "react-router-dom";
// sidebar component found in the pages
const Sidebar = () => {
  return (
    <div className="sidebar flex items-center p-4 bg-slate-100 w-[300px] h-screen left-0">
        <ul className="text-gray-700">
            <li className="my-2">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-500' to='/add-department'>
                    Add department
                </NavLink>
            </li>
            <li className="my-2">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-500' to='/update-department'>
                    Update department
                </NavLink>
            </li>
            <li className="my-2">
                <NavLink activeClassName="text-sky-500" className='active:text-sky-500 hover:text-sky-500' to='/display-department'>
                    Display a single department
                </NavLink>
            </li>
            <li className="my-2">
                <NavLink activeClassName="text-sky-500" className='hover:text-sky-500' to='/department-tree'>
                    Display all departments
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar;