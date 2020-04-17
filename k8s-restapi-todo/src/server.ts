const express = require('express')
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/v0/index.router';
const app = express()
const port = 8200

app.use(bodyParser.json());

//CORS Should be restricted
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,DELETE,PATCH");
    next();
  });

app.use('/api/v0/', IndexRouter)

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))