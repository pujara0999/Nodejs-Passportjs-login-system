const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));


//register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required details
  if (!name || !email || !password || !password2)
    errors.push({ msg: "Please fill all the fields" });

  //check passwoeds match

  if (password !== password2)
    errors.push({ msg: "Please enter same passwords in both the fields" });
  if (password.length < 6)
    errors.push({ msg: "Passwords length not sufficient" });
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        //user exists
        errors.push({ msg: "User Already Registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt)=>
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    req.flash('success_msg','You are now registered');
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
        }))

      }
    });
  }
});
module.exports = router;
