import express from 'express';
//import mongoose from 'mongoose';
import { Issue } from '../modules/collections.js'
import { Project } from '../modules/collections.js'
//import { Navigate } from 'react-router';
//import methodOverride from 'method-override';
const router = express.Router();

//home
router.get('/', async (req, res) => {
    try {
        //console.log("home", req)
        console.log("message, error", req.query)
        const allProj = await Project.find({}, { dateCreated: 0 }).exec();
       // console.log("home--all--", allProj)
        let data = allProj.map(item => {
            return {
                projectname: item.projectname,
                issueCount: item.issueCount
            }
        })
        const lastIssues = await Project.aggregate([{ $unwind: "$issueLogs" }])
                            .project({ projectname: "$projectname", issue_title: '$issueLogs.issue_title', lastUpdate: '$issueLogs.dateUpdated' })
                            .sort({ "lastUpdate": "desc" })
                            .limit(6)
        let result = {};
        result.data = data;
        result.lastIssues = lastIssues;
        // console.log("home--all ** data--", data, lastIssues)
        return res.send(Object.keys(allProj) == 0 ? { data: "no data" } : result)
    }
    catch (err) {
        console.log("error", err)
    }
})
//new project
router.get('/projects', async (req, res) => {
    const allProj = await Project.find({});
    // const lastIssue = await Project.aggregate([{$unwind :"$issueLogs"}]).group({_id: "$projectname", lastUpdate: { $max: '$issueLogs.dateUpdated' }})
    let data = allProj.map((it) => {
        return {
            _id: it._id,
            created_by: it.created_by,
            projectname: it.projectname,
            issueCount: it.issueCount,
            dateCreated: it.dateCreated,
            lastIssueUpdated: it.lastUpdated?.issue_title ? it.lastUpdated?.issue_title: null,
            lastUpdated: it.lastUpdated?.dateUpdated ? it.lastUpdated?.dateUpdated:null,
            openLogs: it.issueLogs.filter(e => e.closed == false).length
        }
    })    
    //console.log("allProj--data--", data)
    return res.send(data && Object.keys(data) != 0 ? data : { data: [1, 2, 3] })
})
//new project post
router.post('/projects', async (req, res) => {
    let message
    //console.log("req,body------>", req.titl, req.creator)
    if (Object.keys(req.body).length != 0) {
        const project = new Project({
            projectname: req.body.title,
            issueLogs: [],
            created_by: req.body.creator
        })
        try {
            const newProj = await project.save()
            res.redirect(`/project/${newProj.id}`)
        } catch (err) {
            console.log(err)
        }
    } else {
        message += " No data provided"
        res.redirect(`/issues/new?message=${message}`)
    }
})
//projects/:id/edit?_method=PUT
router.put('/projects/:id/edit', async (req, res) => {
    let message = req?.query?.message
   // console.log("req,body---editProjects--->", req.body)
    if(!req.params.id){
        message = "no project selected"
       return res.redirect(`/project?message=${message}`)
    }
    try {
        const project = await Project.findById(req.body.id);
        if (req?.body?.title) project.projectname = req.body.title;
        if (req?.body?.creator) project.created_by = req.body.creator;
        const newProj = await project.save()
        res.redirect(`/project/${newProj.id}`)
    } catch (err) {
        console.log(err)
        message += " No data provided"
        res.redirect(`/projects/edit?message=${message}`)
    }
})
 //projects/:id/delete
router.delete('/projects/:id/delete', async (req, res) => {
    let message
    console.log("req,body---deleteProjects--->", req.body.id)
    if(!req.params.id){
        message = "no project selected"
       return res.redirect(`/projects?message=${message}`)
    }
    try{
        console.log("req,body---deleteProjects--req.params.id->", req.body.id)
        await Project.findOneAndDelete( {_id:req.body.id})
        message = "Delete Successful"
        res.redirect(`/projects?message=${message}`)
    }catch(e){
        console.log("error - delete - for redirect",e)
        res.redirect(`/projects?message=${e}`)
    }
}) 
//project :id
router.get('/project/:id', async (req, res) => {
  //  console.log('/project/:id--req.params', req.params)
   // console.log('/project/:id--req.query.projectname', req.query.projectname)
    if (!req.params?.id) res.redirect('/')
    try {
        const { projectname, issueLogs, created_by } = await Project.findById(req.params.id);
        //   console.log("allProj", issueLogs, )
        return res.send({
            projectName: projectname,
            issueLogs: issueLogs,
            createdBy: created_by
        })
        //return res.send(Object.keys(allProj) != 0 ? allProj : { data: [1, 2, 3] })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    return res.send({ data: "no data" })
})
///All issues
router.get('/project/:id/issues', async (req, res) => {
  ////  console.log('/project/:id/issues', req.params)
   // console.log('/project/:id/issues', req.query.projectname)
    if (!req.params?.id) res.redirect('/')
    try {
        const { projectname, issueLogs, created_by } = await Project.findById(req.params.id);
        //   console.log("allProj", issueLogs, )
        return res.send({
            projectName: projectname,
            issueLogs: issueLogs,
            createdBy: created_by
        })
        //return res.send(Object.keys(allProj) != 0 ? allProj : { data: [1, 2, 3] })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    return res.send({ data: "no data" })
})
// post new issue
router.post('/project/:id/issues', async (req, res) => {
    let id = req.params.id
    let message
    try {
        const project = await Project.findById(id)

        if (Object.keys(req.body).length != 0) {
            const issue = new Issue({
                issue_title: req.body.title,
                issue_text: req.body.text,
                assigned_to: req.body.to,
                status_text: req.body.status,
                closed: req.body.closed ? req.body.closed : false,
                created_by: req.body.creator
            })
            try {
                project.issueLogs.push(issue)
                await project.save()

                res.redirect(`/project/${id}?message=${"New Issue Created"}`)
            } catch (err) {
                console.log(err)

            }
        } else {
            message += " No data provided"
            res.redirect(`/issues/new?message=${message}`)
        }
    } catch (err) {
        console.log(err)
    }
})

//get new issue form
router.get('/project/:id/issues/new', (req, res) => {
    res.send('api/issues/new')
})

//edit issue
router.get('/project/:id/issues/:id1', async (req, res) => {
    let number = req.params.id
    const issue = await Issue.find({ id: number })
    res.send(issue)
})

//get edit form
router.get('/project/:id/issues/:id1/edit', (req, res) => {
    console.log('/project/:id/issues/:id1/edit')
    res.send('api/issues/:id')
})

//edit issue
router.put('/project/:id/issues/:id1', async (req, res) => {
    let number = req.params.id
   // console.log('/project/:id/issues/:id1', req.params.id, req.params.id1, req.body)
    const { title, creator, to, status, text, closed } = req.body
    let issue
    try {
        const project = await Project.findById(req.params.id);
        issue = await project.issueLogs.id(req.params.id1);
        issue.issue_title = title
        issue.assigned_to = to
        issue.issue_text = text
        issue.closed = closed
        issue.created_by = creator
        issue.status_text = status
        issue.dateUpdated = new Date()
        await project.save()
    } catch (err) {
        console.log(err)
    }
    res.redirect('/project/' + number)
})




router.delete('/project/:id/issues/:id1/delete', async (req, res) => {
    console.log("delete", req)
    let number = req.params.id
    try {
        const project = await Project.findById(req.params.id);
        await project.issueLogs.id(req.params.id1).deleteOne();
        project.save()
    } catch (err) {
        console.log(err)
    }
    res.redirect('/project/' + number)
})
router.get("/project/*/issues/*", (req, res) => {
    console.log("/project/*/issues/*")
    res.redirect('/')
})

export default router;