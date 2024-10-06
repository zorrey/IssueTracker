
export default function FormNewProj() {
    return (
        <div>
            <h2>New Project</h2>
            <form action="/api/projects" className="column" method="POST">
                <label htmlFor="title">Title Project</label>
                <input id='title' name='title' type="text" placeholder="*title"/>               
                <label htmlFor="creator">Created by</label>
                <input id='creator' name='creator' type="text" placeholder="*created by" />
                <br />
                <button className="submit" type="submit" >Create New Project</button>
            </form>
        </div>
    )
}