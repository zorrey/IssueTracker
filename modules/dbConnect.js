import mongoose from 'mongoose';
import  dotenv from "dotenv";
dotenv.config();
const database = mongoose.connect(process.env.DB_URL, {useUnifiedTopology : true,
                                                   useNewUrlParser: true     });
                                                   
  export default database;                                                 