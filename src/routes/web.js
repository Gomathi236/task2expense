require("dotenv").config();
import express from "express";
import loginController, { checkLoggedIn } from "../controllers/loginController";
import signupController from "../controllers/signupController";
import homePageController from "../controllers/homeController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import connection from "../configs/connectDB";
import profileController from "../controllers/profileController";
import contactusController from "../controllers/contactusController";
import addsourceController, {getsourcePage} from "../controllers/addsourceController";
import expenseController from "../controllers/expenseController";
import { urlencoded } from "body-parser";

let router = express.Router();

initPassportLocal();

router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);

router.get("/login",loginController.checkLoggedOut,loginController.getLoginPage);
router.post("/login",passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: true,
    failureFlash: true,
  })
);
router.get("/signup", signupController.getsignupPage);
router.post("/signup", auth.validateSignup, signupController.createNewUser);



//income

var obj = {};
router.get('/income', function(req, res){

    connection.query('SELECT * FROM income_type ORDER BY id DESC LIMIT 1', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {income: result};
            res.render('income', obj);                
        }
    });

});

router.get('/home', function(req, res) {

  res.render('home', { user: req.user || {} });
});
router.get("/income",addsourceController.addSource)

router.post('/income', function(req, res) {
  var date = req.body.date || null;
  var source = req.body.source || null;
  var description = req.body.description || null;
  var amount = req.body.amount || null;
  var created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
  console.log(created_at);


  console.log(req.body);
  var sql = `INSERT INTO income (date, source, description, amount, created_at) VALUES ("${date}", "${source}", "${description}", "${amount}", "${created_at}")`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
    
    res.redirect("/home");
  });
});


//addsource

router.get("/addsource", (req, res) => {
  res.render("addsource");
});

router.get("/income",addsourceController.addSource)


router.post("/addsource", function (req, res) {
  var type = req.body.type;
  var created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
console.log(created_at);
  
  
  console.log(req.body);

  var sql = `INSERT INTO income_type (type,created_at) VALUES ("${type}","${created_at}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    req.flash("success", "Data added successfully!");

   
  });
  res.redirect("income");

});


//expenses
var obj = {};
router.get('/expenses', function(req, res){

    connection.query('SELECT * FROM expense_type ORDER BY id DESC LIMIT 1 ', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {expenses: result};
            res.render('expenses', obj);                
        }
    });

});

router.get("/home", function (req, res) {
  res.render("home");
});

router.post("/expenses", function (req, res) {
  var date = req.body.date || null;
  var category = req.body.Category || null;
  var description = req.body.description || null;
  var amount = req.body.amount || null;
  var created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
  console.log(created_at);

  console.log(req.body);
  
  var sql = `INSERT INTO expenses (date, category,  description, amount,created_at) VALUES ("${date}", "${category}", "${description}", "${amount}", "${created_at}")`;
  
  connection.query(sql, function (err,data ) {
    if (err) throw err;
    console.log("User data is inserted successfully "); 

    req.flash("success", "Data added successfully!");
   
    
  });
  res.redirect("/home")
  
  
});

//expense type 
router.get("/category", (req, res) => {
  res.render("category");
});

router.get("/expenses",expenseController.addExpense);

router.post("/category", function (req, res) {
  var name = req.body.name;
  var budget = req.body.budget;
  var created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
console.log(created_at);

 console.log(req.body);

  var sql = `INSERT INTO expense_type (name,budget,created_at) VALUES ("${name}", "${budget}","${created_at}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    req.flash("success", "Data added successfully!");
   
  });
  res.redirect("expenses");
  
  
});


//contactus
router.get("/contactus", function(req,res){
  res.render("contactus")
});
router.get("/contactsuccess",function(req,res){
  res.render("contactsuccess")
})

router.post ("/contactus",function(req,res){
  var name = req.body.name;
  var query = req.body.query;
  var email = req.body.email;
  var created_at = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
  console.log(created_at);
  
  console.log(req.body);

  var sql = `INSERT INTO contact_us (name,query,email,created_at) VALUES ("${name}", "${query}","${email}","${created_at}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    req.flash("success", "Data added successfully!");
    res.render("contactsuccess",{data: req.body});
    
  });
});
//track
router.get("/track",function(req,res){
            res.render("track");
})



//profile
router.get("/profile",loginController.checkLoggedIn,profileController.getProfilePage);

//addsource
router.get("/addsource",addsourceController.getsourcePage,addsourceController.addSource);

//logout
router.post("/logout", loginController.postLogOut);

module.exports = router;
