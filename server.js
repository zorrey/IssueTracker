//require('dotenv').config();
import  dotenv from "dotenv";
dotenv.config();
import express from "express"; 
import methodOverride from 'method-override';
import router from "./routers/router.js";

import database from './modules/dbConnect.js';

const port = process?.env.PORT ;

//console.log(process.env)

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'))
app.use('/api', router);
app.listen(port, ()=>{
    console.log("Listening on port ", port);
})