import { Router, Request, Response } from 'express';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';
import { NextFunction } from 'connect';
import { verify, decode } from 'jsonwebtoken'
import * as c from '../../../../config/config';
import { getUserTodos } from '../../../../businessLogic/todo';
import { createLogger } from '../../../../utils/logger'
import { parseUserId } from '../../../../auth/utils'
const { v4: uuidv4 } = require('uuid');
import { createTodo, updateUserTodo, deleteUserTodos, processImage, getUploadUrl } from '../../../../businessLogic/todo'


const router: Router = Router();
const cert = c.cert;
var token: string = "";
const logger = createLogger('Todo DataAcess')
const config = c.config.dev

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    //   return next();
        if (!req.headers || !req.headers.authorization){
            return res.status(401).send({ message: 'No authorization headers.' });
        }
        
    
        const token_bearer = req.headers.authorization.split(' ');
        if(token_bearer.length != 2){
            return res.status(401).send({ message: 'Malformed token.' });
        }

        token = token_bearer[1];
        
        return verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
          if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
          }
          return next();
        });
    }

// Get all todo items
router.get('/', requireAuth, async (req: Request, res: Response) => { 

    let items: any = {}
    
    try {
        items = await getUserTodos(token)

        logger.info('getUserTodos', items) 

        items =  {
            items: [
            ...Object.assign([],Object.keys(items.Items).map(todoItem => items.Items[todoItem]))
            ]
        }        
    } catch (error) {
        throw new Error(error.message)  
    }
  

    res.status(200).send(items);
});   

// Add a todo Items.
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {

  //Generate unique Id
  const todoId = uuidv4();

  //Extract userid from JWT token
  const userId = parseUserId(token)

  const name = req.body.name
  const dueDate = req.body.dueDate

  logger.info('CreateTodo', {body: req.body})


  try {
        //Add New Todo Item and Return the Result
        let newitem: TodoItem = await createTodo({
                                userId,
                                todoId,
                                createdAt: new Date().toISOString(),
                                name: name,
                                dueDate: dueDate,
                                done: false,
                                attachmentUrl: `https://${config.thumbnails_s3_bucket}.s3.amazonaws.com/${todoId}.jpeg`,
                        })

                        var arryObj = [{"name": "alan", "age": 10}]     

        const item =  {
                         item: {
                             ...newitem
                         }
                      } 
                      
        logger.info('New Item', item)                      
          
        res.status(201).send(item);
  }                                        
  catch(error){
      throw new Error(error.message);
  }



});


// update a specific TodoItem
router.patch('/:todoId', 
    requireAuth, 
    async (req: Request, res: Response) => {
        let item: any = {}
        try {

            let { todoId } = req.params;            
            const todoUpdate: TodoUpdate = req.body

            logger.info('TodoUpdate Item', {todoUpdate})

            //Extract the UserId From the jwt Token
            const userId = parseUserId(token)

                item = await updateUserTodo({
                                    userId,
                                    todoId,
                                    createdAt: new Date().toISOString(),
                                    name: todoUpdate.name,
                                    dueDate: todoUpdate.dueDate,
                                    done: todoUpdate.done,
                                    attachmentUrl: `https://${config.thumbnails_s3_bucket}.s3.amazonaws.com/${todoId}.jpeg`,
                                });


            logger.info('User Todo items', {updateItem: JSON.parse(item)});
            
            item = JSON.parse(JSON.stringify(item)) 
            
            res.status(201).send();
        }
        catch(error) {
            throw new Error(error.message);
        } 
});

// delete a specific resource
router.delete('/:todoId', 
    requireAuth, 
    async (req: Request, res: Response) => {
        let { todoId } = req.params;
        
        logger.info('Delete Todoid', {toId: todoId})

        try {
                //Delete User's Todo Item
                await deleteUserTodos(todoId, token)

               res.status(200).send();       
        } catch (error) {
               throw new Error(error.message)
        }
});

// Get Bucket Signed Url For Image Upload.

router.post('/:todoId/attachment', 
    requireAuth, 
    async (req: Request, res: Response, next: NextFunction) => {

        let { todoId } = req.params; 
        
        logger.info("GET SignedURL KEY", {todoId});

        try {
              // Return a presigned URL to upload a file for a TODO item with the provided id
              const uploadUrl: string = await getUploadUrl(todoId)
                           
              logger.info('Thumbnamil Url', {uploadUrl})

              res.status(200).send({uploadUrl});
 
        } catch (error) {
              throw new Error(error.message);
        }

});


// Process Images.
router.post('/:todoId/processimage', 
    requireAuth, 
    async (req: Request, res: Response, next: NextFunction) => {

        let { todoId } = req.params; 
        
        logger.info("Process Imgage Key", {todoId});

        try {
              // Return a presigned URL to upload a file for a TODO item with the provided id
              await processImage(todoId)

              res.status(200).send();
 
        } catch (error) {
              throw new Error(error.message);
        }
});

export const TodoRouter: Router = router;
