import '../App.jsx';
import { useState, useEffect } from 'react'
const Edit = (props) => {
    console.log('props - Edit >>>', props)
    const [id, setId] = useState('')
    const [createdBy, setCreatedBy] = useState(props.createdBy)
    const [title, setTitle] = useState(props.title)
    const [to, setTo] = useState(props.assignTo)
    const [status, setStatus] = useState(props.status)
    const [text, setText] = useState(props.issue_text)
    const [checkbox, setCheckbox] = useState(props.closed? props.closed: false)
    
    useEffect(() => {
        console.log("propsEdit >", props)
        getId()
    }, [])
    const getId = async () => {
        const currentUrl = window.location.href;
        console.log("url>", currentUrl, typeof currentUrl);
        let url = currentUrl.split("/");
        let id = url[4].split("?")[0];
        console.log("edit - id-> ", id)
        setId(id)
    }
    const handleChange = async (e, vtype) => {
        console.log("handle>",e);
        switch(vtype){
           case "creator"  : setCreatedBy(e.target.value); break;
           case "title"  : setTitle(e.target.value);break;
           case "to"  : setTo(e.target.value);break;
           case "status"  : setStatus(e.target.value);break;
           case "text"  : setText(e.target.value);break;
           default : e.target.value;break;

        }   
    }
    const submitClick = async (e) => {
        console.log("submit>",e);
        window.reload()
    }
    console.log("edit - id-> ", id)
    
    return(
        <>
        <div>
        <h2>Update issue : <span className="small"> {props.id }</span></h2>
            <form action={"/api/project/"+ props.projectId+"/issues/"+ props.id + "?_method=PUT"} className="column" method="POST">
                <label htmlFor="title">Title</label>
                <input onChange={(e)=>handleChange(e, "title")} id='title' name='title' type="text" placeholder="*title" value = { title } />
                <label htmlFor="text">Text</label>
                <input onChange={(e)=>handleChange(e, "text")} id='text' name='text' type="text" placeholder="*text" required value = { text}  />
                <label htmlFor="creator">Created by</label>
                <input onChange={(e)=>handleChange(e, "creator")} id='creator' name='creator' type="text" placeholder="*created by" value = {  createdBy} />
                <label htmlFor="to">Assigned to</label>
                <input onChange={(e)=>handleChange(e, "to")} id='to' name='to' type="text" placeholder="(opt) Assigned to" value = { to} />
                <label htmlFor="status">Status</label>
                <input onChange={(e)=>handleChange(e, "status")} id='status' name='status' type="text" placeholder="(opt) Status text" value={status} />
               <div className=" grid2"><label><input onChange={(e)=>setCheckbox(e.target.checked)} type="checkbox" checked={checkbox} name="closed"  value= {checkbox} /> Check to close issue</label>
               <button className="submit" type="submit"  /* onClick={submitClick}  */ >Confirm Update</button>
               </div> 
               
            </form>
        </div>
        </>
    )
    } 
    export default Edit;