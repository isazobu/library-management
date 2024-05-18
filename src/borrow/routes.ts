import express from 'express';


import BorrowRepository from '../borrow/repository/BorrowRepository';
import BorrowService from '../borrow/service/BorrowService';
import BorrowController from './controller/BorrowController';

import { bookService } from '../books/routes';

const borrowRouter = express.Router();



const borrowRepository = new BorrowRepository();
const borrowService = new BorrowService(borrowRepository, bookService);

export const borrowController = new BorrowController(borrowService);






export default borrowRouter;
