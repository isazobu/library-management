import express from 'express';
import UserRepository from './repository/UserRepository';
import UserService from './services/UserService';
import UserController from './controller/UserController';

import {borrowController} from '../borrow/routes';


const userRouter = express.Router();



const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);




userRouter.route('/')
  .post((req, res) => userController.createUser(req, res))
  .get((req, res) => userController.getAllUsers(req, res));

  userRouter.route('/:id')
  .get((req, res) => userController.getUserById(req, res));

  userRouter.route('/:userId/borrow/:bookId')
  .post((req, res) => borrowController.borrowBook(req, res));

  userRouter.route('/:userId/return/:bookId')
  .post((req, res) => borrowController.returnBook(req, res));


export default userRouter;
