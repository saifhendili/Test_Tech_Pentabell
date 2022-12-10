const express = require('express');
const router = express.Router();
const Todos = require('../../models/Todos');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route    GET api/Todo/:id
// @desc     Get Todo by id
// @access   Private

  router.get('/:id',auth, async (req, res) => {
    try {
      const Todo = await Todos.findById(req.params.id);
      res.json(Todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/Todos
// @desc     Get all Todos
// @access   Private


  router.get('/',auth, async (req, res) => {
    try {
      const todos = await Todos.find().sort({ createdAt: -1 });
      res.json(todos);
    } catch (err) {
      return res.status(500).json({ msg: "Server error" });
    }
  });


// @route    delete api/todos/:id
// @desc     delete todo by ID
// @access   Private
  router.delete('/:id',auth, async (req, res) => {
    try {
      const todo = await Todos.findById(req.params.id);
      await todo.remove();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  
// @route    Post api/todos/
// @desc     add todo 
// @access   Private
router.post(
    '/',auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('Description', 'Description is required').notEmpty(),
      check('Description', 'Description field must be lower than 300 character').isLength({  max:300 })

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const newRequest = new Todos({
            title: req.body.title,
            Description: req.body.Description,
            createdAt:Date.now()
        });
    
        const todo = await newRequest.save();
        
        res.json(todo);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route    Put api/todos/:id
// @desc     edit todo by id
// @access   Private
  router.put('/:id',auth, async (req, res) => {
    try {
      const todo = await Todos.findById(req.params.id);

 if(todo){
    todo.title= req.body.title?req.body.title:todo.title;
    todo.Description=req.body.Description?req.body.Description:todo.Description;
     todo.updatedAt=Date.now()
 };
await todo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  


  // @route    Put api/todos/close/:id
// @desc     edit todo by id
// @access   Private
router.put('/close/:id',auth, async (req, res) => {
    try {
      const todo = await Todos.findById(req.params.id);

 if(todo){
    todo.finished=true;
     todo.finished_at=Date.now()
 };
    await todo.save();
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;