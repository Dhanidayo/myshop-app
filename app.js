const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


//setting up mongoose
const mongoose = require('mongoose');
const connectionString = process.env.connectionString || 'mongodb://localhost:27017/myshop_app';

app.use(express.json());

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log("Connected to database")
    }
})


const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    description: String,
    purchaseCount: Number,
    imageUrl: String,
    size: Number,
    color: String,
    tag: Array
})
const Product = mongoose.model('Product', productSchema);

//redirect base link to products 
app.get('/', (req, res) => {
    res.redirect('/products');
})

//create a new product info
app.post('/products', function(req, res) {
    Product.create({
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        purchaseCount: req.body.purchaseCount,
        imageUrl: req.body.imageUrl,
        size: req.body.size,
        color: req.body.color,
        tag: req.body.tag
    }, (err, newProduct) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }else {
            return res.status(200).json({ message: "Product info created successfully", data: newProduct })
        }
    })
})


//fetch all products
app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }else{
            return res.status(200).json({ message: "Fetched Products successfully", data: products })
        }
    })
})

//fetch a single product
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else if (!product) {
            return res.status(404).json({ message: "Oops! Product cannot be found" })
        } else {
            return res.status(200).json({ message: "Fetched product successfully", data: product })
        }
    })
})


//update a product info
app.put('/products/:id', (req, res) => {
    const obj1 = {};
    if (req.body.purchaseCount) {
        obj1.purchaseCount = req.body.purchaseCount;
    }
    Product.findByIdAndUpdate(req.params.id, {
        $set: obj1
    }, {new: true}, (err, product) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else if (!product) {
            return res.status(404).json({ message: "Oops! Product cannot be found" })
        }else{
            product.save((err, savedProduct) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    return res.status(200).json({ message: "Product info updated successfully", data: product })
                }
            })
        }
    })
})

//delete a product
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else if (!product) {
            return res.status(404).json({ message: "Oops! Product cannot be found" })
        } else {
            return res.status(200).json({ message: "Product deleted successfully" })
        }
    })
})

app.listen(port, () => console.log(`app is listening on port ${port}`));