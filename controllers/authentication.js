const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const dashboard = require('./dashboard');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/signup',async (req, res) => {
    res.redirect('/signup')
})

router.post('/signup', urlencodedParser, async (req, res) => {
    var email = req.body.email
    var userName = req.body.user_name
    try {
        const user = await User.findOne({ 'local.email': email } );
   
        const userNames = await User.findOne({ 'local.user_name': userName } );
        
        if (user) {
            res.render('signup', { title: 'Express', error: 'Email already exists' });
        }
        else if (userNames) {
            var error = {message:"Username Already exists"};
            res.render('signup', { title: 'Express', error: 'Username already exists' });
        }
    
        else if (!user && !userNames) {
            try{
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user = await User.create({
                    local: {
                        first_name: req.body.first_name,
                        user_name: req.body.user_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        is_active: 1,
                        password: hashedPassword,
                        country: req.body.country
                    },
                    points: 0
                })

                req.session.user = {
                    email: user.local.email,
                    user_name: user.local.user_name,
                    _id: user._id
                };

                res.redirect("/users/dashboard")
            }
            catch(e){
                console.log(e.message)
                res.render('signup', { title: 'Express', error: 'Error occured' });
            }
        }
    } catch (error) {
        console.log(error.message)
        res.render('signup', { title: 'Express', error: 'Error occured' });
    }
})    

    
router.get('/login', async (req, res) => {
    res.redirect('/login')
})


router.post('/login', urlencodedParser, async (req, res) => {
    let email = req.body.email;
    let userName = req.body.user_name;

    try {
        const userByEmail = await User.findOne({ 'local.email': userName });
        const userByUname = await User.findOne({'local.user_name': userName});
    
        const user = userByEmail || userByUname;

        if (!user) {
            var data={"message":"Cannot find user"}
            res.render('login',{error:"Invalid credentials"})
        }
        else if (user) {
            const match=await bcrypt.compare(req.body.password,user.local.password)
            if (match) {
                //res.write("Login Successful")
                req.session.user = {
                    email: user.local.email,
                    user_name: user.local.user_name,
                    _id: user._id
                }

                res.redirect('/users/dashboard');
            } else {
            //  console.log(uSer)
            // res.write("Incorrect Password")
            var data={"message":"Incorrect Password"}
            res.render('login',{error:"Invalid credentials"})
            }
        }
    } catch (error) {
        res.render('login',{error:"Error Occured"})
    }
    
    
})

router.get('/dashboard', dashboard)
module.exports=router;
