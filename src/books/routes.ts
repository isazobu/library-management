import express from 'express';
import BookController from './controller/BookController';
import BookRepository from './repository/BookRepository';
import BookService from './services/BookService';

const bookRouter = express.Router();



const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

bookRouter.route('/')
  .post((req, res) => bookController.createBook(req, res))
  .get((req, res) => bookController.getAllBooks(req, res));

  bookRouter.route('/:id')
  .get((req, res) => bookController.getBookById(req, res))
  .post((req, res) => bookController.borrowBook(req, res))
  .put((req, res) => bookController.returnBook(req, res));

export default bookRouter;
