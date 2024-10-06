import { useEffect, useState } from "react"
import '../App.css'
//import {  Link } from "react-router-dom";
//<Link to={"/api/project/" + id + "/issues/" + item._id + "/delete"} activeClassName="current" > 
export default function All(){
    console.log(' all >>>') 
const[records, setRecords] = useState({})
const [loader, setLoader] = useState('true')
const [id, setId] = useState()
useEffect(()=>{
    getId()
    getRecords()
},[])
const getId = async () => {
    const currentUrl = window.location.href;
    let url = currentUrl.split("/");
    console.log("all-url>", currentUrl, url[4]);
    setId( url[4]);      
}
const getRecords = async () =>{      
       try{  
        console.log("all-url--->", "/api/project/" + id + "/issues")
        const res = await fetch("/api/project/" + id + "/issues")
        console.log("all-res--->", res)
        const response = await res.json()
        setRecords({...response})
       }catch(err){
        console.log("error-all-", err)
       }   
       setLoader(false)    
    }
   
        return(
            loader ? <h1>LOADING....</h1>:
        <>
        {console.log(records)}
        <h2>All issues</h2>
        <div>{records&& records.issueLogs? 
        records.issueLogs.map((item, index)=>{
          return  <div key={index} className="grid issues">
            <hr />
            <ul className="item">      
                <li className="grid2"><span>issue:</span><span>{item.issue_title}</span> </li>           
                <li className="grid2"><span>Issue id: </span> <span>{item._id} </span> </li>                
                <li className="grid2"><span>created by:</span> <span>{item.created_by}</span>     </li>
                <li className="grid2"> <span> description:</span> <span>{item.issue_text}</span>  </li>
                <li className="grid2"><span>assigned to:</span>   <span>{item.assigned_to} </span> </li>
                <li className="grid2"><span>status:</span>  <span>{item.status_text}</span>   </li>
                <li className="grid2"><span>date created:</span>   <span>{item.dateCreated} </span> </li>
                <li className="grid2"><span>date updated:</span>   <span> {item.dataUpdated} </span></li>
                <li className="grid2"><button >update</button>   <button className="delete"> delete </button></li>             
            </ul>
            <hr />
            </div>
        })
        : "No data"}</div>
        
        </>
    )
    } 