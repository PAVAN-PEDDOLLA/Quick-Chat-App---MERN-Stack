const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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

router.post('/login', async (req, res) => {
    try {
        //1. Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                message: 'User does not exist',
                success: false
            })
        }

        //2. check if the password is correct
        const isvalid = await bcrypt.compare(req.body.password, user.password);
        if (!isvalid) {
            return res.send({
                message: 'invalid password',
                success: false
            })
        }

        //3. If the user exists & password is correct, assign a JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.send({
            message: 'user logged-in successfully',
            success: true,
            token: token
        });

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router;