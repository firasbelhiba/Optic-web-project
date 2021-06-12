const Category = require('../models/Category')
const express = require('express')
const router = express.Router()


//@route GET api/products/
//@desc get categories
//@access Private
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find()

        if (!categoryList) res.status(500).json({ message: "The category List is currently empty" })

        res.send(categoryList)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//@route POST api/products/
//@desc add category
//@access Private
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            color: req.body.color
        })

        if (!category) return res.status(404).send('The category cannot be created')

        await category.save()
        res.send(category)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})



module.exports = router

