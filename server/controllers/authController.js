const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
    try {
        //1. If the user already exists
        const user = await User.findOne({ email: req.body.email });
        //2. If user exists, send an error response
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                status: false
            });
        }
        //3. encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        //4. create new user, save in DB
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            message: 'user Created successfully!',
            success: true
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        });
    }
})

module.exports = router;