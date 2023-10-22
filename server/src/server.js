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
const categoryRoute=require('./routes/category')
const collectionRoute=require('./routes/collection')
const productRoute=require('./routes/product')
const instagramRoute=require('./routes/instragm')
const recentWorkRoute=require('./routes/recentWork')


////
app.use('/storage/image',storageRoute)
app.use('/menu',menuRoute)
app.use('/category',categoryRoute)
app.use('/collection',collectionRoute)
app.use('/products',productRoute)
app.use('/instagram',instagramRoute)
app.use('/recent-work',recentWorkRoute)



app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
