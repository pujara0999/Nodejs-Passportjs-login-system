const express = require("express");
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));


//register handle
router.post('/register',(req,res) => {
    
    const {name, email, password, password2} = req.body;
    let errors = [];

    //check required details
    if(!name || !email ||!password || !password2 )
    errors.push({msg: 'Please fill all the fields'});


    //check passwoeds match

    if(password !== password2)
    errors.push({msg:'Please enter same passwords in both the fields'});
    if(password.length<6)
    errors.push({msg: 'Passwords length not sufficient'});
    if(errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2

            });
    }
    else {
        res.send('pass');

    }
});
module.exports = router;
