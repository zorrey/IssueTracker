import { useEffect, useState } from "react"
import '../App.jsx';
import '../App.css';
import './New.jsx';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
//import All from './All.jsx';
import { Link, Outlet } from "react-router-dom";
export default function Project(props) {
    const [records, setRecords] = useState([])
    const [projName, setProjName] = useState('')
    const [loader, setLoader] = useState('true')
    const [id, setId] = useState()   
    const [edit, setEdit] = useState({id: null})     
    const [del, setDel] = useState({id: null})     
    const [show, setShow] = useState(true) 
     useEffect(() => {   
        let id1
        const getId = async () => {         
            const currentUrl = window.location.href;
            console.log("url>", currentUrl);
            let url = currentUrl.split("/");
            id1 = url[4].split('?')[0]
            setId(id1);
            let query = currentUrl.split("=");
            let name = query[1]
            console.log("proj - id->>>> ---name--->> ", id1, name)
            setProjName(name)
        }
        const getRecords = async (id) => {
            console.log("Project- id-> ", id)
            try {
                const res = await fetch("/api/project/" + id+"?")
                const response = await res.json()
                console.log("Proj- response 001-> ", response)
                setRecords(response)
                setLoader(false)
            } catch (err) { 
                console.log(err) 
                setLoader(false)
            }
            
        }
        console.log("props01>", props)         
        getId()
        getRecords(id1)
    }, [props])
    useEffect(()=>{
        console.log(records)
    },[records])
    const updateClick=(item,id,e)=>{
        console.log("item,index,e**********",item,id,e)
    //  const  dataToSend = item;
      setEdit({...edit, id:id})
      setDel({id: null})

    }
    const delClick=(item,id,e)=>{
        console.log("del-----item,index,e**********",item,id,e)
    //  const  dataToSend = item;
      setDel({...del, id:id})
      setEdit({id: null})
    }
console.log(records)
    return (
        loader ? <h1>LOADING....</h1> :        
        <div className="wrap">
            <div className="nav">
                <ul className='row nav project'>                    
                    <li className="project"> <Link to="" onClick={()=>{this.window.reload; setShow(true)}} id={id} >ALL</Link> </li>
                    <li className="project"> <Link to="issues/new" id={id} onClick={()=>{setShow(false)}} >New Issue</Link> </li>
               {/*      <li className="project"> <Link to="issues/:id1/edit" >Update Issue</Link> </li>
                    <li className="project"> <Link to="issues/:id1/delete" >Delete Issue</Link> </li> */}
                </ul>

            </div>
            <div className="grid1">
                <h2 className="page">Project: { records?.projectName }</h2>
                <h3 className="page">Project id: { id }</h3>
                {console.log("id****", id)}
                {  <>
                     <Outlet id={id} />                          
                            {console.log(records)}
                         {show && 
                      <> 
                       <h3>All issues</h3>
                            <div>{records&& records.issueLogs? 
                            records.issueLogs.map((item, index)=>{
                              return  <div key={index} className="grid issues" >
                                <hr />
                                <ul className="item">      
                                    <li className="grid2"><span>issue:</span><span>{item.issue_title}</span> </li>           
                                    <li className="grid2"><span>Issue id: </span> <span>{item._id} </span> </li>                
                                    <li className="grid2"><span>created by:</span> <span>{item.created_by}</span>     </li>
                                    <li className="grid2"> <span> description:</span> <span>{item.issue_text}</span>  </li>
                                    <li className="grid2" ><span>assigned to:</span>   <span>{item.assigned_to} </span> </li>
                                    <li className="grid2"><span>status:</span>  <span>{item.status_text}</span>   </li>
                                    <li className="grid2"><span>date created:</span>   <span>{new Date(item.dateCreated).toLocaleString('en-AU')} </span> </li>
                                    <li className="grid2"><span>date updated:</span>   <span> {new Date(item.dateUpdated).toLocaleString('en-AU')} </span></li>
                                    <li className="grid2"   id={"action"+ " " + index}><span>closed: {item.closed? "true":"false"}</span>   <span> <input  type="checkbox" name="closed" checked={item.closed} value={item.closed} />{item.closed? "closed":"not closed"}</span></li>
                                    <li className="grid2">
                                   <a  href= {"#action"+ " " +  index} > <button style={{width: "100%"}} onClick={(e)=>updateClick(item, item._id, e.target)} className="submit"> update</button>   </a> 
                                   <a  href= {"#action"+ " " + index} > <button style={{width: "100%"}}onClick={(e)=>delClick(item, item._id, e.target)} className="delete"> delete </button> </a> </li>             
                                </ul>
                                {edit.id==item._id && <div className="box">
                                    <Edit 
                                        title = {item.issue_title}                                         
                                        id = {item._id}  
                                        createdBy={item.created_by}                                     
                                        issue_text={item.issue_text}                                     
                                        assignTo={item.assigned_to}   
                                        status = {item.status_text}     
                                        projectId={id}    
                                        closed = {item.closed}      
                                        index={index}                  
                                    />
                                    </div>}
                                {del.id==item._id && <div className="box">
                                    <Delete
                                        title = {item.issue_title}                                         
                                        id = {item._id}  
                                        createdBy={item.created_by}                                     
                                        issue_text={item.issue_text}                                     
                                        assignTo={item.assigned_to}   
                                        status = {item.status_text}     
                                        projectId={id}    
                                        closed = {item.closed}     
                                        index={index}                          
                                    />
                                    </div>}
                                    
                                <hr />
                                </div>
                            })
                            : "No data"}</div>  
                      </>}                    
                      </>                      
                }  
            </div>
        </div>
    )
}