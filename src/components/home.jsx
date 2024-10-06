import { useEffect, useState } from "react"
export default function Home() {
    const [records, setRecords] = useState([])
    const [lastIssues, setLastIssues] = useState([])
    const [loader, setLoader] = useState('true')
    useEffect(() => {
        getRecords()
    }, [])
    const getRecords = async () => {
        const res = await fetch("/api/")
       // console.log("projects-res", res)
        const response = await res.json()
     //   console.log("ALL projs -> ", response)
        setRecords([...response.data])
        setLastIssues([...response.lastIssues])
        setLoader(false)
    }
    return (
        <>
            {
                loader ? <h2>LOADING....</h2> :

                    <div > <h2>Current Projects:</h2>

                        <table className="TblRow">
                            <tr>
                                <th>title</th>
                                <th>issues count</th>
                            </tr>
                            {
                              records&&  records?.map((item, index) => {
                                    return (
                                        <tr key={index} className="item" >
                                            <td>{item.projectname}</td>
                                            <td>{item.issueCount}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                        <hr /><br />
                        <h2>Recent Issues:</h2><h3>Last Updated Issues</h3>
                        <table className="TblRow">
                            <tr>
                                <th>Project title</th>
                                <th>Issue title</th>
                                <th>Date Updated</th>
                            </tr>
                            {
                               lastIssues&&  lastIssues?.map((item, index) => {
                                    return (
                                        <tr key={index} className="item" >
                                            <td>{item.projectname}</td>
                                            <td>{item.issue_title}</td>
                                            <td>{new Date(item.lastUpdate).toLocaleString('en-AU')}</td>  
                                        </tr>
                                    )
                                })
                            }
                        </table>  <hr />
                    </div>
            }
        </>
    )
} 