import Book, { BookCreationAttributes, BookGetAllAttributes} from '../model/Book';
import BookRepositoryInterface from './BookRepositoryInterface';
import NotFoundError from '../../errors/NotFoundError';
import BadRequestError from '../../errors/BadRequestError'
import redisClient from "../../config/redis";
import { Transaction } from 'sequelize';
import CustomError from '../../errors/CustomError';

class BookRepository implements BookRepositoryInterface {
  findById(id: number): Promise<Book | null> {
    return Book.findByPk(id);
  }

  async createBook(bookData: BookCreationAttributes): Promise<Book> {
    console.log('BookRepository.createBook');
    console.log('bookData:', bookData);
    return Book.create(bookData);
  }

  async getAllBooks(): Promise<BookGetAllAttributes[]> {
    return Book.findAll({
      attributes: ['id', 'name'],
    })
  }

  async getBookById(id: number): Promise<Book | null> {
    
    const book = await redisClient.get(`book_detail:${id}`);
    if (book) {
      return JSON.parse(book);
    }
    const bookFromDb = await Book.findByPk(id, {
      attributes: ['id','name', 'score'],
    });

    if(!bookFromDb) {
      throw new NotFoundError('Book not found');
    }
    
    if (bookFromDb) {
      redisClient.set(`book_detail:${id}`, JSON.stringify(bookFromDb));
    }

    return bookFromDb;
    
  }

  /**
   * Borrows a book by setting its `isBorrowed` property to `true`.
   * 
   * @param id - The ID of the book to borrow.
   * @returns A Promise that resolves to the borrowed book if it exists and is not already borrowed, or `null` otherwise.
   */
  async save(book: Book): Promise<Book> {
    return book.save();
  }

  /**
   * Returns a book by updating its borrowed status and rating.
   * Also updates the book details in Redis cache.
   *
   * @param id - The ID of the book to be returned.
   * @param rating - The rating to be assigned to the book.
   * @param transaction - Optional transaction object for database operations.
   * @returns A Promise that resolves to the updated Book object, or null if the book is not found.
   * @throws {NotFoundError} If the book is not found.
   * @throws {CustomError} If an error occurs while returning the book.
   */
  async returnBook(id: number, rating: number, transaction?: Transaction): Promise<Book | null> {
    let book;
    try {
      book = await Book.findByPk(id, { transaction });
      if (!book) {
        throw new NotFoundError('Book not found');
      }

      book.isBorrowed = false;
      book.score = rating;
      await book.save({ transaction });

      
      await redisClient.set(`book_detail:${id}`, JSON.stringify({
        id: book.id,
        name: book.name,
        score: book.score,
      }, null, 2));

      return book;
    } catch (error) {  
      // must seperatly handle redis and db transaction errors
      if (error instanceof CustomError) {
        throw error; 
      }

      console.error('Failed to return book', error);
      throw new CustomError('An error occurred while returning the book', 500);
    }
  }

}


export default BookRepository;
