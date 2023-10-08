require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const { query,body ,validationResult,matchedData} = require('express-validator');
const app=express()
const database=require('./database/database')
///////
app.use(bodyParser.json());
app.use(cors())

////// initial db
database.init()

//// storage route
const storageRoute=require('./routes/storage')
const menuRoute=require('./routes/menu')


////
app.use('/storage/image',storageRoute)
app.use('/menu',menuRoute)



app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
