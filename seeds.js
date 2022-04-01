/* File to enter fake data in DB */
const mongoose = require('mongoose')
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

const p = new Product({
    name: 'Black Grapes',
    price: 40,
    category: 'fruit'
})

p.save()
    .then(p=>{
        console.log(p);
    })
    .catch(e=>{
        console.log('ERROR', e);
    })

const seedProducts = [
    {name:'Banana', price:30, category:'fruit' },
    {name:'Tomato', price:15, category:'vegetable' },
    {name:'Guava', price:45, category:'fruit' },
    {name:'Carrot', price:20, category:'vegetable' },
    {name:'Apple', price:40, category:'fruit' },
    {name:'Egg plant', price:25, category:'vegetable' },
    {name:'kidney beans', price:35, category:'pulses' },
    {name:'ButterMilk', price:12, category:'dairy' }
]
Product.insertMany(seedProducts)
    .then(res=>{
        console.log(res);
    })
    .catch(e=>{
        console.log('ERROR', err);
    })