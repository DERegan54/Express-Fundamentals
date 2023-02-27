const express = require('express')
const Item = require('../item')
const router = express.Router()
const items = require('../fakeDb')
const ExpressError = require('../expressError')

// GET routes
// Gets all items
router.get('', (req, res, next) => {
    try {
        res.json({items: Item.findAllItems()});
    } catch (err) {
        return next(err)
    }
});

// Gets a specific item
router.get('/:name', (req, res, next)  => {
    try {
        let itemFound = Item.find(req.params.name); 
        return res.json({item: itemFound});
    } catch (err) {
        return next(err)
    }
});


// POST route 
// Creates a new item
router.post('', (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    } catch (err) {
        return next(err)
    }
});


// PATCH route
// Updates an existing item
router.patch('/:name', (req, res, next) => {
    try {
        let itemFound = Item.update(req.params.name, req.body);
        return res.json({item: itemFound});
    } catch (err) {
        return next(err)
    }
});


// DELETE route
// Deletes an item
router.delete('/:name', (req, res, next) => {
    try{ 
        Item.remove(req.params.name);
        return res.json({message: "Item deleted."});
    } catch (err) {
        return next(err)
    }
});


module.exports = router;