const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/signup',async (req, res) => {
    var data={"message":null}
    res.render('signup',{data:data})

})

router.post('/signup', urlencodedParser, async (req, res) => {
    var email = req.body.email
    var userName = req.body.user_name
    try {
        const user = await User.findOne({ 'local.email': email } );
   
        const userNames = await User.findOne({ 'local.user_name': userName } );
        
        if (user) {
            req.error.message = "Email is in use";
            res.render("signup");
        }
        else if (userNames) {
            var error = {message:"Username Already exists"};
            req.error.message = "Email is in use";
            res.render('signup');
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
                    }
                })
                console.log(user)
                req.user = user;
                res.redirect("/users/dashboard")
            }
            catch(e){
                res.send(e.message)
            }
        }
        
    } catch (error) {
        res.send(error.message)
        
    }
})    

    
router.get('/signin', async (req, res) => {
   
    var data={"message":null}
    res.render('login',{data:data})
})


router.post('/signin', urlencodedParser, async (req, res) => {
    var email = req.body.email
    
    const uSer = await User.findOne({ 'local.email': email })
    
    if (!uSer) {
        var data={"message":"Cannot find user"}
        res.render('login',{data:data})
   }
    else if (uSer) {
       // const passWord= user.password
       const dat= uSer.local
        console.log(dat.password)
        try{
       
       const match=await bcrypt.compare(req.body.password,dat.password)
        if (match) {
            //res.write("Login Successful")
             
             res.send('Success')
        } else {
          //  console.log(uSer)
           // res.write("Incorrect Password")
           var data={"message":"Incorrect Password"}
           res.render('login',{data:data})
        }
        }
catch(e){
    res.send(e.message)
}
    }
})

router.get('/dashboard',(req, res) => {
    res.render("user_dashbaord")

})
module.exports=router;
