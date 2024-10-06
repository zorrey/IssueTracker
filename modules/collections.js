//import express from 'express';
import mongoose from 'mongoose';
//import db from './dbConnect';

const { Schema } = mongoose;

const IssueSchema = new Schema({
    "assigned_to": {type: String},
    "status_text": String,
    "closed": {type: Boolean, default:false},  
    "issue_title": {type: String, required: true},
    "issue_text": {type: String, required: true},    
    "created_by": {type: String, required: true},
    dateCreated:{       
        type: Date,
        required: true,
        default: Date.now
    },
    dateUpdated: {       
        type: Date,
        required: true,
        default: Date.now()
    }
});
const ProjectSchema = new Schema({
    projectname:{type:String, required:true},
    dateCreated:{       
    type: Date,
    required: true,
    default: Date.now()
            },
    issueLogs: [ IssueSchema ],
    created_by:{type: String, required: true}
},{
    virtuals: {
        issueCount: {
          get() {
            //console.log(this.issueLogs.length)
            return this.issueLogs.length;
          }
        }
        ,
        lastUpdated: {
          get() {           
            //let id= this._id; 
            let projectDoc
            //console.log("id---01->>>>", this._id, id)
            projectDoc = this.issueLogs.map((item)=>{
              return {issue_title: item.issue_title,
                dateUpdated:item.dateUpdated
              }
            }).sort(function(a,b){return (b["dateUpdated"]-a["dateUpdated"])})
           //console.log("projectDoc", projectDoc)            
           return projectDoc[0]
          }
        }  
}}

, { toJSON: { virtuals: true } }
, { toObject: { virtuals: true } }
);
ProjectSchema.set('toObject', { virtuals: true });

/* ProjectSchema.virtual('issueCount').get(function() {
    return this.issueLogs?.length;
  });  */

/* ProjectSchema.statics.issueCount = async function(){
} 

 ProjectSchema.statics.updatedLast = async function(id){  
   // console.log("id", id)
    let projectDoc = await Project.aggregate([{$match:{_id: id }},{$unwind :"$issueLogs"}])
        .project( {_id: "$_id", issueId:'$issueLogs._id', issue_title: '$issueLogs.issue_title', lastUpdate: '$issueLogs.dateUpdated' })
        .sort({'lastUpdate' :"desc"}).limit(1).exec();
    //console.log("projectDoc", projectDoc)
    return projectDoc
}
*/
ProjectSchema.pre('findOneAndDelete', async function(next){
  try{ 
      let id = await this.getQuery()["_id"];
      console.log( 'this.id', id )
      const project = await Project.find({_id: new mongoose.Types.ObjectId(id)}).exec()
      console.log("project--", project)
      console.log("project-length-", project[0].issueLogs, project[0].issueCount)
      if((project[0].issueLogs && project[0].issueLogs?.length > 0 )|| project[0].issueCount >0 ){
          console.log('poject length model pre: ', project[0].issueLogs.length)
          return   next(new Error('This project has issue logs'))
      } else if(project[0].issueLogs.length == 0) {
          console.log('success project model pre: ', project[0].issueLogs?.length)
          return  next()
      }else{
        return   next(new Error('This project has issue logs'))
      }
  }catch(error){
      console.log('pre - model error', error)
      return  next(new Error('Error deleting project'))
  }
})
/*
  FooModel.aggregate(
    { $unwind: '$foobars' },
    { $group: { _id: null, maxTime: { $max: '$foobars.time' }}}, 
    callback);
    
    
    db.getCollection('bar').aggregate([
    {$match: {serialNumber: <number>}}, //use match to find based on serial number
    {$unwind: '$operation'}, //unwind the operation array
    {$sort: {'operation.number': -1}}, //sort operation number desc
    {$limit: 1}, //get only first item
    {$project: {_id: 0, name: '$operation.name', number: '$operation.number'}} //project the object and attributes you want
])


        const data = await Project.aggregate([{$unwind :"$issueLogs"}]) 
                                    .group( {_id: "$_id", lastUpdate: { $max: '$issueLogs.dateUpdated' }});
        const data1 = await Project.aggregate([{$match:{_id: new mongoose.Types.ObjectId(id)}},{$unwind :"$issueLogs"}])
                                    .project( {_id: "$_id", issueId:'$issueLogs._id', lastUpdate: '$issueLogs.dateUpdated' }).sort({'lastUpdate' :"desc"}).limit(2)
*/
const Issue = mongoose.model('Issue', IssueSchema);
const Project = mongoose.model('Project', ProjectSchema)
export {Project}
export {Issue}
//export const Issue = mongoose.model("Issue", IssueSchema);
//export const Project = mongoose.model("Project", ProjectSchema);





