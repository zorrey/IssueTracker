import { useEffect, useState } from "react"
export default function FormNewProj() {
    const[records, setRecords] = useState([])    
    const [loader, setLoader] = useState('true')
    const [createdBy, setCreatedBy] = useState()
    const [title, setTitle] = useState()
    const [id, setId] = useState()
    useEffect(()=>{
    getRecords()
    },[])
        const getRecords = async () =>{
            const res = await fetch("/api/projects")
            const response = await res.json()
            setRecords([...response])
            setLoader(false)
        }
        const handleChange = async (e, vtype) => {
          //  console.log("handle>",e);
            switch(vtype){
               case "creator" : setCreatedBy(e.target.value);break;
               case "title" : setTitle(e.target.value);break;
               default : e.target.value;break;   
            }   
        }
      const selectChange = async (e) => {
    //  console.log("select>",e);
      let project = records?.filter(i=>i._id==e.target.value)
      let title = project[0]?.projectname
      let creator = project[0]?.created_by
      setCreatedBy(creator)
      setTitle(title)
      setId(e.target.value)
    //  console.log(project, title, creator)
        }
    return (
        !loader &&
        <div>
            <h2>Edit Project</h2>
            <form action={"/api/projects/" + {id} + "/edit?_method=PUT"} className="column" method="POST">
                <label htmlFor="id">Id Project</label>
                <select onChange={(e)=>selectChange(e)} id='id' name='id' type="id" placeholder="*id" >    
                <option  name='id' id='id' value="">Select Project Id</option>
                {
                    records.map((i,indx)=>{
                        return(
                            <option key={indx} name='id' id='id' value={i._id}>{i._id}</option>
                        )
                    })
                }  
                </select>         
                <label htmlFor="title">Title Project</label>
                <input onChange={(e) => handleChange(e, "title")} id='title' name='title' type="text" placeholder="*title" value={title}/>               
                <label htmlFor="creator">Created by</label>
                <input onChange={(e) => handleChange(e, "creator")} id='creator' name='creator' type="text" placeholder="*created by" value={createdBy} />
                <br />
                <button className="submit" type="submit" >Edit Project</button>
            </form>
        </div>
    )
}