import { useEffect, useState } from "react"
export default function Delete(props) {
    console.log('props - newIssue >>>', props)
    const [id, setId] = useState('')
    const [id1, setId1] = useState('')
    const [createdBy, setCreatedBy] = useState(props.createdBy)
    const [title, setTitle] = useState(props.title)
    const [to, setTo] = useState(props.assignTo)
    const [status, setStatus] = useState(props.status)    
    const [text, setText] = useState(props.issue_text)
    const [checkbox, setCheckbox] = useState(props.closed? props.closed: false)
    useEffect(() => {
        console.log("del >", props)
        getId()
    }, [])
    const getId = async () => {
        const currentUrl = window.location.href;
        console.log("url>", currentUrl, typeof currentUrl);
        let url = currentUrl.split("/");
        let id = url[4];
        let id1 = url[6];
        console.log("del - id-> ", id)
        console.log("del - id1-> ", id1)
        setId(id)
        setId1(id1)
    }
    console.log("del - id-id1> ", id, id1)
    const handleChange = async (e, vtype) => {
        console.log("handle>",e);
        switch(vtype){
           case "creator"  : setCreatedBy(e.target.value); break;
           case "title"  : setTitle(e.target.value);break;
           case "to"  : setTo(e.target.value);break;
           case "status"  : setStatus(e.target.value);break;
           case "text"  : setStatus(e.target.value);break;
           default : e.target.value;break;
        }   
    }
    return (
        <div>
            <h2>Delete issue : <span className="small">{props.id }</span> </h2>
            <form action={"/api/project/" + props.projectId + "/issues/" + props.id  + "/delete"+"?_method=DELETE"} className="column" method="POST">
                <label htmlFor="title">Title</label>
                <input onChange={(e) => handleChange(e, "title")} id='title' name='title' type="text" placeholder="*title" value={title} />
                <label htmlFor="text">Text</label>
                <input onChange={(e) => handleChange(e, "text")}  id='text' name='text' type="text" placeholder="*text" value={text}/>
                <label htmlFor="creator">Created by</label>
                <input onChange={(e) => handleChange(e, "creator")} id='creator' name='creator' type="text" placeholder="*created by" value={createdBy} />
                <label htmlFor="to">Assigned to</label>
                <input onChange={(e) => handleChange(e, "to")} id='to' name='to' type="text" placeholder="(opt) Assigned to" value={to} />
                <label htmlFor="status">Status</label>
                <input onChange={(e) => handleChange(e, "status")} id='status' name='status' type="text" placeholder="(opt) Status text" value={status} />
                <div className="grid2">
                <label><input onChange={(e)=>setCheckbox(e.target.checked)} type="checkbox" checked={checkbox} name="closed"  value= {checkbox} /> Check to close issue</label>
                <button className="newPost delete" type="submit" >Confirm Delete</button>    
                </div> <br />
            </form>
        </div>
    )
} 