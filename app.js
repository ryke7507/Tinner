const express = require('express');
const path = require('path');
const { Pool, Client } = require('pg'); //package for handling postgress
const keys = require('./keys')  // get spoonacular api key
const app = express()

const API_KEY = keys.spoonacularKey;

// useful reads:
// --http methods and callback functions--
// https://www.w3schools.com/tags/ref_httpmethods.asp
// https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
// --psql and node--
// https://medium.com/dailyjs/postgresql-with-nodejs-d0dcedba5884
// https://medium.com/@dannibla/connecting-nodejs-postgresql-f8967b9f5932
// https://medium.com/@forbeslindesay/the-easiest-way-to-query-postgres-in-node-js-56765997919c
// https://medium.com/@Alibaba_Cloud/building-a-restful-api-with-express-postgresql-and-node-using-es6-1de2b3b06c64


// PSQL Connectors, still not sure what this is doing.
// https://spoonacular.com/food-api/docs#Search-Recipes

// const pool = new Pool({
//   user: 'dbuser',
//   host: 'come back',	//coming back to this
//   database: 'users_db',
//   password: 'come back',
//   port: 3211,
// })


// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })


// const client = new Client({
//   user: 'dbuser',
//   host: 'come back',
//   database: 'users_db',
//   password: 'secretpassword',
//   port: 3211,
// })

// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

app.get('/spoonacular/search', (req, res) => {
    req.send
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/main_page.html'));
});

app.get('/browserPage', (req, res) => {
    res.sendFile(path.join(__dirname + '/browserPage.html'));
});

app.get('/foodOptions', (req, res) => {
    res.sendFile(path.join(__dirname + '/foodOptionsStart.html'));
});


//write to db when hitting sounds delecious button
app.post("/send", function(req, res) {
	console.log(req.body);
})

app.use(express.static(__dirname + '/'));

app.listen(3000)