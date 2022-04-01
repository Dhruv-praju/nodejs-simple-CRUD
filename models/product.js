const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum : ['fruit', 'vegetable', 'dairy', 'pulses']
    }
})
productSchema.post('findOneAndDelete', function(doc){
    console.log(doc)
    console.log('DELETED Product!');
})
productSchema.post('deleteMany',{document:true, query:false}, function(doc){
    console.log('this is after deletemany');
    console.log(doc)
    console.log('DELETED EVERYTING !!!!!');
})
const Product = new mongoose.model('Product', productSchema)

module.exports = Product