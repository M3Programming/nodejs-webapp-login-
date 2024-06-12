const express = require('express');
const router = express.Router();
const conn = require('../lib/database');
const parseUrl = require('body-parser');




let ecodeUrl = parseUrl.urlencoded({ extended: false });

//display login page
router.get('/login', function(request, response, next){
    response.render('login', {
        title: 'Login',
        username: '',
        password: ''
    })
});

//action of login button when clicked - form action '/authentication
router.post('/authentication', function(request, response, next){
    //get username and password input by the client
    let username = request.body.user_name;
    let password = request.body.password;
    if (username && password) {
        conn.query('SELECT * FROM user_data WHERE username = ? AND password = ?', [username, password], function (err, rows, fields) {
            if (err) throw err;

            // if username and password is incorrect
            if (rows.length <= 0) {
                request.flash('error', 'Please enter the correct username and Password!')
                response.redirect('/login')
            }
            else { 
                request.session.loggedin = true;
                request.session.name = rows[0].name;
                response.redirect('/home');

            }


        })
    } else {
        request.flash('error', 'Username and Password should not be blank!')
        response.redirect('/login')
    }

});

//display homepage when login is successful
router.get('/home', function(request, response, next){
    //check first if the status is logged in or not
    //if session is logged in
    if(request.session.loggedin){
        //display home.ejs
        response.render('home', {
            title: 'Dashboard', 
            name: request.session.name,
        });
    }else{//else if not logged in
        //display warning message
        request.flash('Warning', 'Please Login first!');
        response.redirect('/login')
    }
});

//Logout method
router.get('/logout', function(request, response){
    request.session.destroy();
    response.clearCookie('session');
    response.redirect('/login');
});

module.exports=router;