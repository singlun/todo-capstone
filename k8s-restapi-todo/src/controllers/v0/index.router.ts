import { Router, Request, Response } from 'express';
import { TodoRouter } from './todo/routes/todo.router';

const router: Router = Router();

router.use('/todos', TodoRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`v0`);
});

export const IndexRouter0: Router = router;