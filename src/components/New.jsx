import { useEffect, useState } from "react"
export default function FormNew(props) {
    console.log('props - newIssue >>>', props)
    const [id, setId] = useState('')
    useEffect(() => {
        console.log("props01 >", props)
        getId()
    }, [])
    const getId = async () => {
        const currentUrl = window.location.href;
        console.log("url>", currentUrl, typeof currentUrl);
        let url = currentUrl.split("/");
        let id = url[4];
        console.log("proj - id-> ", id)
        setId(id)
    }
    console.log("proj02 - id-> ", id)
    return (
        <div className="wrap">
             <h2>New issue </h2>
            <form action={ "/api/project/" + id + "/issues" } className="column" method="POST">
                <label htmlFor="title">Title</label>
                <input id='title' name='title' type="text" placeholder="*title"/>
                <label htmlFor="text">Text</label>
                <input id='text' name='text' type="text" placeholder="*text" />
                <label htmlFor="creator">Created by</label>
                <input id='creator' name='creator' type="text" placeholder="*created by" />
                <label htmlFor="to">Assigned to</label>
                <input id='to' name='to' type="text" placeholder="(opt) Assigned to" />
                <label htmlFor="status">Status</label>
                <input id='status' name='status' type="text" placeholder="(opt) Status text" />
                <button className="submit" type="submit" >Submit</button>
            </form>
        </div>
    )
}