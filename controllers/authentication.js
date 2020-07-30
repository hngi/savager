const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.get('/signup',async (req, res) => {
    res.render("signup");

})

router.post('/signup', urlencodedParser, async (req, res) => {
    console.log("hMee")
    var email = req.body.email
    var userName = req.body.user_name
    const user = await User.findOne({ local: { email: email } });
    const userNames = await User.findOne({ local: { user_name: userName } });
    if (user) {
        res.write("Email is taken")
    }
    else if (userNames) {
        res.write("User Name is taken");
    }
    else if (!user && !userName) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User.create({
            local: {
                first_name: req.body.first_name,
                user_name: req.body.user_name,
                last_name: req.body.last_name,
                email: req.body.email,
                is_active: 1,
                password: hashedPassword,
                country: req.body.country
            }
        })
    }
    await user.save((err, success) => {
        
        if (err) {
            res.status(500).json({
                status: "fail",
                message: "Error establishing database connection"
            });
            res.write("Error establishing database connection")
        } else if (success) {
           
                    res.render("signin");
        }


    })
    

})
router.post('/signin', urlencodedParser, async (req, res) => {
    var email = req.body.email
    const user = await User.findOne({ local: { email: email } });
    if (!user) {
        res.write("Cannot find user")
        return res.status(400).send('Cannot find user')
   }
    else if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.write("Login Successful")
            res.send('Success')
        } else {
            res.write("Incorrect Password")
            res.send('Not Allowed')

        }

    }
})
module.exports=router;
