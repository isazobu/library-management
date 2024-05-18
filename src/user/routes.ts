import express from 'express';
import UserRepository from './repository/UserRepository';
import UserService from './services/UserService';
import UserController from './controller/UserController';

const userRouter = express.Router();



const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRouter.route('/')
  .post((req, res) => userController.createUser(req, res))
  .get((req, res) => userController.getAllUsers(req, res));

  userRouter.route('/:id')
  .get((req, res) => userController.getUserById(req, res));


export default userRouter;
