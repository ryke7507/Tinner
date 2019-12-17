const express = require('express');
const path = require('path');
const { Pool, Client } = require('pg'); //package for handling postgress
//const keys = require('./keys');  // get spoonacular api key
const pgPromise = require('pg-promise');
const nodeFetch = require('node-fetch');
var passport = require("passport");
const bodyParser = require('body-parser'); // Add the body-parser tool has been added
const unirest = require('unirest');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// useful reads:
// --http methods and callback functions--
// https://www.w3schools.com/tags/ref_httpmethods.asp
// https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
// --psql and node--
// https://medium.com/dailyjs/postgresql-with-nodejs-d0dcedba5884
// https://medium.com/@dannibla/connecting-nodejs-postgresql-f8967b9f5932
// https://medium.com/@forbeslindesay/the-easiest-way-to-query-postgres-in-node-js-56765997919c
// https://medium.com/@Alibaba_Cloud/building-a-restful-api-with-express-postgresql-and-node-using-es6-1de2b3b06c64


const pug = require('pug');
const pgp = require('pg-promise')();

const dbConfig = {
host: 'localhost',
port: 5432,
database: 'food',
user: 'postgres',
password: 'halalmeat'
};

let database = pgp(dbConfig);

app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/main_page.html'));
});

app.get('/foodOptionsStart', (req, res) => {
    res.sendFile(path.join(__dirname + '/foodOptionsStart.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/profile_page.html'))
})

app.get('/browserPage', (req, res) => {
    res.sendFile(path.join(__dirname + '/browserPageAPI.html'))
})

app.get('/randomRecipe/get', (req, res) => {
    const randomizer = Math.floor(Math.random() * 10 + 1);
    let randomRecipe = {};

    const request = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random")
    request.query({
        "q": `${randomizer}`
    });
    request.headers({
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "d92f1966f5msh90f9f2ce18774fdp13f36bjsn8aad0db9b6f8"
    });
    request.end((response) => {
        if (response.error) console.error('Error my dude: ', response.error);
        console.log(response.body)
        res.send({
            title: response.body.recipes[0].title,
            readyInMinutes: response.body.recipes[0].readyInMinutes,
            image: response.body.recipes[0].image,
            instructions: response.body.recipes[0].instructions,
            sourceUrl: response.body.recipes[0].sourceUrl
        })
    })
})

app.get('/login', async function(req, res) {

    res.render('/login',{
    });

  });

  app.get('/log_out', function(req, res) {

    req.session.destroy();
    res.redirect('/');
  });


  app.post('/login', function(req, res) {
  
    var query1 = `SELECT * FROM users;`;
    var password=req.body.password;
    var user_name=req.body.user_name;
  
    db.any(query1)
          .then(function (data) {
            req.session.log = false;
            var suc = "The log-in info you have provided does not match.";
            for(var i=0; i<data.length; i++){
              var db_user = data[i].user_name;
              var db_user_password = data[i].password;
              if(user_name == db_user){

                if(password == db_user_password){
                  req.session.pass = password;
                  req.session.user = user_name;
                  req.session.log = true;
                  suc = "Succesfully logged in!"
                }
              }
            }
            if(req.session.log == false){
              res.render('/login',{
                my_title: "Saved Recipes",
                d: suc
              })
            }
            else{
              res.redirect('/');
            }
          })
          .catch(function (err) {

              console.log(err)
              res.render('/saved_recipes', {
                  title: 'Saved Recipes',
                  d: ''
              })
          })
  });
  app.post('/sign_up', function(req, res) {

    var query1 = `SELECT * FROM users;`;
    var password=req.body.password;
    var user_name=req.body.user_name;

    var add_user=`INSERT INTO users(user_name, password) VALUES ('${user_name}', '${password}');`;

    db.query(add_user);

  res.render('/login')

  });


//write to db when hitting sounds delecious button
app.post("/send", function(req, res) {
	console.log(req.body);
})

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT, '0.0.0.0');
