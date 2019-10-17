const router = require('express').Router();
let User = require('../models/user.model');

// Your Challenge: Make rwo routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all users on record
// GET: /
// ========================================
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

// 2. add a new user
// POST /
// ========================================
router.post('/add', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.send(result)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;