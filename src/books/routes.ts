import express from 'express';
import BookController from './controller/BookController';
import BookRepository from './repository/BookRepository';
import BookService from './services/BookService';
import { validate } from '../middleware/validations/validation';
import { bookSchema } from '../middleware/validations/bookSchema';

const bookRouter = express.Router();



const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

bookRouter.route('/')
  .post(validate(bookSchema),(req, res) => bookController.createBook(req, res))
  .get((req, res) => bookController.getAllBooks(req, res));

  bookRouter.route('/:id')
  .get((req, res) => bookController.getBookById(req, res))

export default bookRouter;
