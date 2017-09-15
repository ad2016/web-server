

const express = require('express');
var fs = require('fs');
const hbs = require('hbs');

//process.env is an object that contains all the environment variables key value pair
const port = process.env.PORT || 3000;  //sets default value as env doesnt work for local

var app = express();
// In order to create an app , all we have to do is to call the express() method.

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');



app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    next();

});

// app.use ((req,res, next)=> {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});


// hbs.registerHelper('screamIt',(text)=>{
//     return text.toUpperCase();
// });


// to register a http handler to handle http get requests


app.get('/', (req,res)=> {

    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to our website',
        currentYear : new Date().getFullYear()
    });

});


app.get('/about', (req,res) => {

    // res.send('<h1>About page! </h1>This is about Anusha');

    res.render('about.hbs', {
        pageTitle : 'About page',
        currentYear : new Date().getFullYear()
    });
});


app.get('/bad', (req,res)=> {

    res.send({
        errormessage : 'Request is denied',
        errors : [
            'bad connection',
            'permission denied',

        ]
    });

});


app.get('/projects', (req,res) =>{

    res.render('project.hbs',{

        pageTitle : 'Projects'
    });

});


app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});