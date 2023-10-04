"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({
        message: 'Added todo successfully',
        todo: newTodo,
        todos: todos
    });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => {
        todoItem.id === tid;
    });
    if (todoIndex >= 0) {
        // If the index is more than 0, we know we've got at least one
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'updated Todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo with that id' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    // if the todo item id doesn't equal the req params todoid,
    res.status(200).json({ message: 'Deleted Todo', todos: todos });
});
exports.default = router;
