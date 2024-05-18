import Book, { BookCreationAttributes} from '../model/Book';
import BookRepositoryInterface from './BookRepositoryInterface';

class BookRepository implements BookRepositoryInterface {
  async createBook(bookData: BookCreationAttributes): Promise<Book> {
    console.log('BookRepository.createBook');
    console.log('bookData:', bookData);
    return Book.create(bookData);
  }

  async getAllBooks(): Promise<Book[]> {
    return Book.findAll();
  }

  async getBookById(id: number): Promise<Book | null> {
    return Book.findByPk(id);
  }

  async borrowBook(id: number): Promise<Book | null> {
    const book = await Book.findByPk(id);
    if (book) {
      book.isBorrowed = true;
      await book.save();
    }
    return book;
  }

  async returnBook(id: number, rating: number): Promise<Book | null> {
    const book = await Book.findByPk(id);
    if (book) {
      book.isBorrowed = false;
      book.score = rating;
      await book.save();
    }
    return book;
  }
}

export default BookRepository;
