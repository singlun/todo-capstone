import { Router, Request, Response } from 'express';
import { TodoRouter } from './todo/routes/todo.router';
import * as c from '../../config/config';

const config = c.config.dev

const router: Router = Router();

router.use('/todos', TodoRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`v1`);
});

export const IndexRouter1: Router = router;