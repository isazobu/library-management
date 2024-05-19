import { Request, Response } from "express";
import { BookCreationAttributes, BookGetAllAttributes } from "../model/Book";
import BookServiceInterface from "../services/BookServiceInterface";
import CustomError from "../../errors/CustomError";



class BookController {
  private bookService: BookServiceInterface;
  
  constructor(bookService: BookServiceInterface) {
    this.bookService = bookService;
  }


    async createBook(req: Request, res: Response): Promise<void> {
      try {
        const bookData: BookCreationAttributes = req.body;
        await this.bookService.createBook(bookData);
        res.status(201).json();
      } catch (error) {
        console.error('Error in BookController.createBook:', error);
        res.status(500).json({ error: 'Failed to create book' });
      }
    }
  
    async getAllBooks(req: Request, res: Response): Promise<void> {
      try {
        const books = await this.bookService.getAllBooks();
        res.json(books);
      } catch (error) {
        console.error('Error in BookController.getAllBooks:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
      }
    }
  
    async getBookById(req: Request, res: Response): Promise<void> {
      try {
        const book = await this.bookService.getBookById(parseInt(req.params.id));
        res.json(book);
      } catch (error) {
        console.error('Error in BorrowController.borrowBook:', error);
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to borrow book' });
    }
}
    }
  
    async borrowBook(req: Request, res: Response): Promise<void> {
      try {
        const book = await this.bookService.borrowBook(parseInt(req.params.id));
        res.json(book);
      } catch (error) {
        console.error('Error in BookController.borrowBook:', error);
        res.status(500).json({ error: 'Failed to borrow book' });
      }
    }
  
    async returnBook(req: Request, res: Response): Promise<void> {
      try {
        const { rating } = req.body;
        const book = await this.bookService.returnBook(parseInt(req.params.id), rating);
        res.json(book);
      } catch (error) {
        console.error('Error in BookController.returnBook:', error);
        res.status(500).json({ error: 'Failed to return book' });
      }
    }
  }
  
  export default BookController;