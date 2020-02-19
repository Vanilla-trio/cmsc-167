//Credits for Ui
//https://developer.okta.com/blog/2018/06/05/authentication-vanilla-js
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express(); 
const port = 3000;
//app.set('port', process.env.PORT || 8080);
//where we keep the grades
let grades = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());



//app.listen(app.get('port'));
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
//var title = document.getElementById("");
