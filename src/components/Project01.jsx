import { useEffect, useState } from "react"
import '../App.jsx';
import '../App.css';
import './New.jsx';
//import All from './All.jsx';
import { Link, Outlet } from "react-router-dom";
export default function Project(props) {
    const [records, setRecords] = useState([])
    const [projName, setProjName] = useState('')
    const [loader, setLoader] = useState('true')
    const [id, setId] = useState()                    
/*     useEffect(() => {
        console.log("props01>", props) 
        getRecords()
        getId()
    }, []) */
    const getId = async () => {
        const currentUrl = window.location.href;
        console.log("url>", currentUrl);
        let url = currentUrl.split("/");
        setId(url[4]);
        let query = currentUrl.split("=");
        let name = query[1]
        console.log("proj - id->>>> ---name--->> ", id, name)
        setProjName(name)
    }
    const getRecords = async () => {
        console.log("Proj- res -> ")
        try {
            const res = await fetch("/api/project/" + id)
            const response = await res.json()
            console.log("Proj- response -> ", response)
            setRecords([...response])
        } catch (err) { console.log(err) }
        setLoader(false)
    }

    return (
        loader ? <h1>LOADING....</h1> :
        <div className="wrap">
            <div className="nav">
                <ul className='row nav project'>
                    <li className="project"> <Link to="issues" >All Issues</Link> </li>
                    <li className="project"> <Link to="issues/new" id={id} >New Issue</Link> </li>
                    <li className="project"> <Link to="issues/:id1/edit" >Update Issue</Link> </li>
                    <li className="project"> <Link to="issues/:id1/delete" >Delete Issue</Link> </li>
                </ul>

            </div>
            <div className="grid1">
                <h2 className="page">Project: { projName }</h2>
                <h3 className="page">Project id: { id }</h3>

                {
                    records?.map((item, index) => {
                        return <div key={index} className="item">
                         
                            <hr />
                            <ul>
                                <li> <a href={"/" + item._id}>issue: {item.issue_title}</a></li>
                                <li> project id:   {item._id} </li>
                                <li> created by:   {item.created_by} </li>
                                <li> logs: {item.issuelogs} </li>
                            </ul>
                            <hr />
                        </div>
                    })
                }
                <Outlet id={id} />

            </div>


        </div>


    )
}