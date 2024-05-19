import Book, { BookCreationAttributes, BookGetAllAttributes} from '../model/Book';
import BookRepositoryInterface from './BookRepositoryInterface';
import NotFoundError from '../../errors/NotFoundError';
import BadRequestError from '../../errors/BadRequestError'
import redisClient from "../../config/redis";

class BookRepository implements BookRepositoryInterface {
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
      attributes: ['name', 'score'],
    });
    
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
  

  async saveBook(book: Book): Promise<Book> {
    return book.save();
  }

  async returnBook(id: number, rating: number): Promise<Book | null> {
    const book = await Book.findByPk(id);

    if (book) {
      book.isBorrowed = false;
      book.score = rating;
      await book.save();
      await redisClient.set(`book_detail:${id}`, JSON.stringify({
        name: book.name,
        score: book.score,
      }, null, 2));
    }


    return book;
  }
}


export default BookRepository;
