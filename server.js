'use strict';

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT
const key = process.env.google_civic
app.use(cors());

app.get('/', home);
app.get('/elections', getElections);


function home(req, res){
  console.log('home route');
  return res.send('Hello World');
}

function getElections(req, res){
  console.log('route hit');
  let query = req.query.query;

  let url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${query}`;

  return superagent.get(url)
    .then(response => {
      return res.json(response.body);
    }).catch(err => handleError(err, res));
}


function handleError(err, res){
  console.log(err);
  if(res) res.status(500).send('Sorry something went wrong');
}


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
