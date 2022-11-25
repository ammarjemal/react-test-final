import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
    return (
        <div className="flex">
            <div className="sidebar flex items-center p-4 bg-slate-100 w-[300px] h-screen left-0">
                <ul>
                    <li className="my-2">
                        <NavLink activeClassName="text-sky-500 underline" className='text-gray-700 hover:text-sky-500' to='/add-department'>
                            Add department
                        </NavLink>
                    </li>
                    <li className="my-2">
                        <NavLink activeClassName="text-sky-500 underline" className='text-gray-700 hover:text-sky-500' to='/update-department'>
                            Update department
                        </NavLink>
                    </li>
                    <li className="my-2">
                        <NavLink activeClassName="text-sky-500 underline" className='text-gray-700 hover:text-sky-500' to='/display-department'>
                            Display a single department
                        </NavLink>
                    </li>
                    <li className="my-2">
                        <NavLink activeClassName="text-sky-500 underline" className='text-gray-700 hover:text-sky-500' to='/department-tree'>
                            Display all departments
                        </NavLink>
                    </li>
                </ul>
            </div>
            <main className="overlow-x-hidden min-h-screen w-full">
                {props.children}
            </main>
        </div>
    )
}

export default Layout;