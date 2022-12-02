const express = require('express');
const products = require('../../Products');
const router = express.Router();
const uuid = require('uuid');

// get all products
router.get('/', (req,res) => res.json(products));

router.get('/:category', (req,res) => {
    const found = products.some(product => product.category === req.params.category)

    if(found){
        res.json(products.filter(product => product.category === req.params.category))
    }
    else{
        res.status(400).json({msg: `No product in the category ${req.params.id}`})
    }

})

router.get('/:id', (req,res) => {
    const found = products.some(product => product.id === parseInt(req.params.id))

    if(found){
        res.json(products.filter(product => product.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: `No product with the id ${req.params.id}`})
    }

})

// Create a new product
router.post('/', (req, res) => {
    const newProduct = {
        id: uuid.v4(),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category:"men's clothing",
        image: `https://api.lorem.space/image/${req.body.title}?w=150&amp;amp;amp;amp;h=220`,
        rating:{"rate":2.6,"count":235}
    };
    if(!newProduct.title || !newProduct.price) {
        return res.status(400).json({ msg: 'Please include an email and name' });
    }

    products.push(newProduct);

})


module.exports = router;