const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


//DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() =>console.log('Mongodb connected'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
// connect flash
app.use(flash());

//Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

//Bodyparsser
app.use(express.urlencoded({ extended: false}));

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port no ${PORT}`));
