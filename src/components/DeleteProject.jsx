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
  
      const selectChange = async (e) => {
      console.log("select>",e);
      let project = records?.filter(i=>i._id==e.target.value)
      let title = project[0]?.projectname
      let creator = project[0]?.created_by
      setCreatedBy(creator)
      setTitle(title)
      setId(e.target.value)
      console.log(project, title, creator)
        }
    return (
        !loader &&
        <div>
            <h2>Delete Project</h2>
            <h3><em className="orange">!!!</em>  Only projects without any issue can be deleted.</h3>
            <hr /><br />
            <form action={"/api/projects/" + {id} + "/delete?_method=DELETE"} className="column" method="POST">
                <label htmlFor="id">Id Project</label>
                <select onChange={(e)=>selectChange(e)} id='id' name='id' type="id" placeholder="*id" required >    
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
                <input id='title' name='title' type="text" placeholder="*title" value={title}/>               
                <label htmlFor="creator">Created by</label>
                <input  id='creator' name='creator' type="text" placeholder="*created by" value={createdBy} />
                <br />
                <button className="delete" type="submit" >Delete Project</button>
            </form>
        </div>
    )
}