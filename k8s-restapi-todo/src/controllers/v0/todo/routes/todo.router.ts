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
    res.send(userTodoItems);
});   

// Add a todo Items.
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {

  //Generate unique Id
  const todoId = uuidv4();

  //Extract userid from JWT token
  const userId = parseUserId(token)

  const name = req.body.name;
  const dueDate = req.body.dueDate;  

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


    res.status(201).send(newTodoItems);
});


// update a specific resource
router.patch('/:todoId', 
    requireAuth, 
    async (req: Request, res: Response) => {
        let { todoId } = req.params;
        const todoUpdate: TodoUpdate = req.body;

        //Extract userid from JWT token
        const userId = parseUserId(token)        

        //Update Todo Item and Return the Result
        const updateTodoItems: TodoUpdate = await updateUserTodo(todoUpdate, todoId)

        logger.info('Update Item', updateTodoItems) 


        res.status(201).send(updateTodoItems);

});

// delete a specific resource
router.delete('/:todoId', 
    requireAuth, 
    async (req: Request, res: Response) => {
        let { todoId } = req.params;
        
        logger.info('User Todoid', {toId: todoId})

        //Delete User's Todo Item
        await deleteUserTodos(todoId)

        res.status(201).send({});

});


// Gernerate Todo Upload Url.
router.post('/:todId', 
    requireAuth, 
    async (req: Request, res: Response) => {

  let { todoId } = req.params;       

  // Return a presigned URL to upload a file for a TODO item with the provided id
  const url: string = getUploadUrl(todoId)

  logger.info('getUploadUrl', {url})


    res.status(201).send(url);
});


// Process Images.

router.post('/:imageId', 
    requireAuth, 
    async (req: Request, res: Response) => {

  let { imageId } = req.params;       

  // Return a presigned URL to upload a file for a TODO item with the provided id
  const url = await processImage(imageId)

  logger.info('Thumbnamil Url', {url})


  res.status(201).send(url);
});


export const TodoRouter: Router = router;
