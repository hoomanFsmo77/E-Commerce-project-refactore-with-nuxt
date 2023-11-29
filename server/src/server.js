require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors');
const app=express()
const database=require('./database/database')
///////
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
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
const policyRoute=require('./routes/policy')
const pagesRoute=require('./routes/pages')
const cartRoute=require('./routes/cart')


////
app.use('/storage/image',storageRoute)
app.use('/menu',menuRoute)
app.use('/category',categoryRoute)
app.use('/collection',collectionRoute)
app.use('/products',productRoute)
app.use('/instagram',instagramRoute)
app.use('/recent-work',recentWorkRoute)
app.use('/policy',policyRoute)
app.use('/pages',pagesRoute)
app.use('/cart',cartRoute)



app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
