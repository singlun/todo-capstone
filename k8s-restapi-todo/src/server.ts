const express = require('express')
import bodyParser from 'body-parser';
//Alan added - For support Versionning Control
import * as c from './config/config';
import {IndexRouter0} from './controllers/v0/index.router';
import {IndexRouter1} from './controllers/v1/index.router';
import {IndexRouter2} from './controllers/v2/index.router';

export class Server {

  constructor(
    private readonly version: string = c.config.dev.todo_version == undefined ? "v0" : c.config.dev.todo_version,        
  ) {}

  startServer() {  
      const app = express();
      const port = 8080;

      app.use(bodyParser.json());

      //CORS Should be restricted
      app.use(function(req: any, res: any, next: any) {
          res.header("Access-Control-Allow-Origin","*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
          res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,DELETE,PATCH");
          next();
        });

      //app.use('/api/v0/', IndexRouter)

      //Alan added - For support Versionning Control
      // eval('Routerindex =  IndexRouter' + this.version.substring(1,this.version.length) + ';');
      console.log(this.version)
      
      let routerIndex : any;

      if (this.version.substring(1,this.version.length) == "0") {
            routerIndex = IndexRouter0;
      }
      else if(this.version.substring(1,this.version.length) == "1") {
            routerIndex = IndexRouter1;
      }
      else if(this.version.substring(1,this.version.length) == "2") {
        routerIndex = IndexRouter2;
  }      
       
      app.use(`/api/${this['version']}/`, routerIndex);
      //app.use(`/api/${this['version']}/`, this[`indexRouter${this['version'].substring(1,this['version'].length)}`];

      //app.get('/', (req, res) => res.send('Hello World!'))

      app.listen(port, () => console.log(`Todo Backend Listening at http://localhost:${port}`))
  }
}

const server = new Server();
server.startServer();