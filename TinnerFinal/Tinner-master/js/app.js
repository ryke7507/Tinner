const express = require('express');
const path = require('path');
const { Pool, Client } = require('pg'); //package for handling postgress
const keys = require('./keys');  // get spoonacular api key
const pgPromise = require('pg-promise');
const nodeFetch = require('node-fetch');
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


// PSQL Connectors, still not sure what this is doing.
// https://spoonacular.com/food-api/docs#Search-Recipes

// const dbInfo = {
// 	host: 'localhost',
// 	port: 4000,
// 	database: 'food',
// 	user: 'postgres',
// 	password: 'secure-password69'
// };

// let database = pgPromise(dbInfo);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/main_page.html'));
});

app.get('/browserPage', (req, res) => {
    res.sendFile(path.join(__dirname + '/browserPage.html'));
});

app.get('/foodOptionsStart', (req, res) => {
    res.sendFile(path.join(__dirname + '/foodOptionsStart.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/profile_page.html'))
})

app.get('/randomRecipe', (req, res) => {
    res.sendFile(path.join(__dirname + '/randomRecipe.html'))
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


//write to db when hitting sounds delecious button
app.post("/send", function(req, res) {
	console.log(req.body);
})

app.use(express.static(__dirname + '/'));

app.listen(3000);