/** SETUP */
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const methodOverride = require('method-override') // pavekage for making PUT, PATCH and DELETE request

const app = express()

// import the 'Product' model from models directory
const Product = require('./models/product')

// make Database connection
mongoose.connect("mongodb://localhost:27017/farmStand", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("CONNECTION OPEN  !");
  })
  .catch((err) => {
    console.log("ERROR !!", err);
  });

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))      // for using PUT and DELETE request in forms

/** ROUTES */

app.get('/products', async (req, res)=>{
    const {category} = req.query  // filtering with categories
    // handling URL: http://localhost:3000/products?category=dairy
    if (category) {
      const products = await Product.find({category:category})
      res.render('products/products.ejs', {products, category})  // pass data to HTML page
    }
    else{
      // show list or table of products
      const products = await Product.find({})   //waits to get all products from DB
      res.render('products/products.ejs', {products, category:'All'})  // pass data to HTML page
    }
})
app.get('/products/new', (req, res)=>{
    res.render('products/new.ejs')
})
app.post('/products', async (req, res)=>{
    console.log(req.body);
    let new_product = req.body                  // grab data from request
    const added_prod = await Product.create(new_product)       // save that in DB
    res.redirect(`/products/${added_prod.id}`)
})
app.get('/products/:id', async (req, res)=>{
    const { id:product_id } = req.params        // grab data from URL
    // find product of that id from DB
    const product = await Product.findById(product_id)    
    res.render('products/show.ejs', {product})    // pass data to HTML page
})
app.get('/products/:id/edit', async (req, res)=>{
    const {id} = req.params
    const foundProduct = await Product.findById(id)
    res.render('products/edit.ejs', {product:foundProduct})
})
app.put('/products/:id', async (req, res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
    res.redirect(`/products/${product._id}`)
})
app.delete('/products', async(req, res)=>{
  const prds = await Product.deleteMany({})
  res.send('DELETING ALL')
})
app.delete('/products/:id', async (req, res)=>{
  const {id} = req.params
  await Product.findByIdAndDelete(id)
  res.redirect('/products')
})
// app.get('/products')

app.listen(3000, (req, res)=>{
    console.log('Server started');
    console.log('App is listening at 3000');
})