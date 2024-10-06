import { Link, Outlet } from "react-router-dom";
export default function Nav() {
    return (
        <><h1 className="title">Issue Tracker</h1>
            <nav >
                <div className="navLine">
                    <ul className='row nav'>
                        <li> <Link to="/" >Home</Link> </li>
                        <li> <Link to="/projects" >Projects</Link> </li>
                        <li> <Link to="/projects/new" >New Project</Link> </li>
                        <li> <Link to="/projects/edit" >Edit Project</Link> </li>
                        <li> <Link to="/projects/delete" >Delete Project</Link> </li>
                    </ul>
                </div>

            </nav>
            <Outlet />
        </>
    )

}