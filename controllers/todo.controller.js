const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
    try {
        const createModel = await TodoModel.create(req.body);
        return res.status(201).json(createModel);
    } catch (err) {
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await TodoModel.findById(req.params.todoId);
        if (!todoModel) {
            res.status(404).send();
        }
        res.status(200).json(todo);
    } catch (err) {
        console.log("getTodoById err", err);
        next(err);
    }
};
