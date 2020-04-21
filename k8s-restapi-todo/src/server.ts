const express = require('express')
import bodyParser from 'body-parser';

//Alan added - For support Versionning Control
import * as c from './config/config';

//Alan
//Must change Manually. If version 1 change it to
//import {IndexRouter} from './controllers/v1/index.router'
import {IndexRouter} from './controllers/v0/index.router';
const version = c.config.dev.todo_version

const app = express()
const port = 8100

app.use(bodyParser.json());

//CORS Should be restricted
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,DELETE,PATCH");
    next();
  });

//app.use('/api/v0/', IndexRouter)

//Alan added - For support Versionning Control
app.use(`/api/${version}/`, IndexRouter)

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Todo Backend Listening at http://localhost:${port}`))