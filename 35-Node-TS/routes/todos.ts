import { Router }from 'express';


import { ToDo } from '../models/singleTodo'

const todos: ToDo[] = [];


const router = Router();


router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})

router.post('/todo', (req, res, next) => {
     const newTodo: ToDo = {
        id: new Date().toISOString(),
        text: req.body.text
     }
     todos.push(newTodo)
})


export default router;