import { Router, Request, Response } from 'express';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';
import { NextFunction } from 'connect';
import { verify, decode } from 'jsonwebtoken'
import * as c from '../../../../config/config';
import { getUserTodos } from '../../../../businessLogic/todo';
import { createLogger } from '../../../../utils/logger'
import { parseUserId } from '../../../../auth/utils'
import { v4 as uuidv4 } from 'uuid';
import { createTodo, updateUserTodo, deleteUserTodos, getUploadUrl, processImage } from '../../../../businessLogic/todo'


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
    const userTodoItems: TodoItem[] = await getUserTodos(token)

    logger.info('getUserTodos', userTodoItems) 

    const items = JSON.parse(JSON.stringify(userTodoItems))

    res.send({items});
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
        const newTodoItems: TodoItem = await createTodo({
                                                  userId,
                                                  todoId,
                                                  createdAt: new Date().toISOString(),
                                                  name: name,
                                                  dueDate: dueDate,
                                                  done: false,
                                                  attachmentUrl: `https://${config.thumbnails_s3_bucket}.s3.amazonaws.com/${todoId}.jpeg`,
                                            })

        logger.info('New Item', newTodoItems) 

        const item = JSON.parse(JSON.stringify(newTodoItems))

        res.status(201).send({item});
  }                                        
  catch(error){
      throw new Error(error.message);
  }



});


// update a specific TodoItem
router.patch('/:todoId', 
    requireAuth, 
    async (req: Request, res: Response) => {

        try {

            let { todoId } = req.params;
            const todoUpdate: TodoUpdate = req.body

            logger.info('TodoUpdate Item', {todoUpdate})

            //Extract the UserId From the jwt Token
            const userId = parseUserId(token)

                let updateItem: any = await updateUserTodo({
                                    userId,
                                    todoId,
                                    createdAt: new Date().toISOString(),
                                    name: todoUpdate.name,
                                    dueDate: todoUpdate.dueDate,
                                    done: todoUpdate.done,
                                    attachmentUrl: `https://${config.thumbnails_s3_bucket}.s3.amazonaws.com/${todoId}.jpeg`,
                                });


            logger.info('User Todo items', {updateItem: JSON.parse(updateItem)});
            
            const item = JSON.parse(JSON.stringify(updateItem))

            res.status(201).send({item});
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
        
        logger.info('User Todoid', {toId: todoId})

        try {
                //Delete User's Todo Item
                await deleteUserTodos(todoId, token)

               res.status(201).send({});       
        } catch (error) {
               throw new Error(error.message)
        }
});

// Process Images.

router.post('/:todoId/attachment', 
    requireAuth, 
    async (req: Request, res: Response) => {

        let { todoId } = req.params;       

        try {
              // Return a presigned URL to upload a file for a TODO item with the provided id
              const uploadUrl = await processImage(todoId)

              logger.info('Thumbnamil Url', {uploadUrl})
  
              res.status(201).send({uploadUrl});        
        } catch (error) {
              throw new Error(error.message);
        }

});


export const TodoRouter: Router = router;
