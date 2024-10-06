import { useEffect, useState } from "react"
export default function Projects() {
    const[records, setRecords] = useState([])    
    const [loader, setLoader] = useState('true')
    const [message, setMessage] = useState('...')
    useEffect(()=>{
    getRecords();
    },[])
        const getRecords = async () =>{
            const res = await fetch("/api/projects")
            console.log("projects-res", res)
            const response = await res.json()
            console.log("ALL projs -> ", response)
           // if(response.message)setMessage(response.message)
            console.log("response", response)
            setRecords([...response])
            setLoader(false)
            getMessage();
        }
        const getMessage=()=>{
            const currentUrl = window.location.href;
            let url = currentUrl.split("?");
            console.log("projects-query>", currentUrl, url[1]);
            let message =  url[1]?.split('%20').join(' ').split('=')[1]
            setMessage(message)
            setTimeout(()=>{
            setMessage("")
           },3000)
        }
//console.log("message", message)
    return ( 
        loader? <h2>LOADING....</h2>:
        <div>
            {<div>{message}</div>}
        <h2> Projects:</h2>
        {
        records?.map((item, index)=>{
           return <div key={index} className="item">
            <hr />
            <ul className="screen">      
            <li><a className="row between link" href={"/project/"+ item._id +"?projectname="+item.projectname}> <h3>project title : <em>{item.projectname}</em></h3> <span><button >View Issues</button></span> </a></li>           
                <li className="row between" > <span> Project id: </span> <span>{item._id} </span> </li>                
                <li className="row between" > <span>Created by:</span>  <span>{item.created_by}</span>   </li>
                <li className="row between" > <span>Date Created:</span>  <span>{new Date(item.dateCreated).toLocaleString('en-AU') }</span>   </li>
                <li className="row between" > <span>Last Issue Updated: </span> <span>{item?.lastIssueUpdated ? item.lastIssueUpdated :"-"}</span> </li>    
                <li className="row between" > <span>Date Updated: </span> <span>{item.lastUpdated!=null? new Date(item.lastUpdated).toLocaleString('en-AU'):"-" }</span> </li>  
                <li className="row between" > <span>Logs count: </span> <span>{item.issueCount}</span> </li>
                <li className="row between" > <span>Active Logs: </span> <span>{item.openLogs}</span> </li>             
            </ul>
            <hr /><br />
            </div>
        })
        }
        </div>
    )
}