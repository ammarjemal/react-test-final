import Sidebar from "./Sidebar";
// default layout for the pages
// contains a sidebar and a main section
const Layout = (props) => {
    return (
        <div className="flex">
            <Sidebar/>
            <main className="overlow-x-hidden min-h-screen w-full">
                {props.children}
            </main>
        </div>
    )
}

export default Layout;