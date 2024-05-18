import Book, { BookCreationAttributes, BookGetAllAttributes} from '../model/Book';
import BookRepositoryInterface from './BookRepositoryInterface';

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
    return Book.findByPk(id);
  }

  /**
   * Borrows a book by setting its `isBorrowed` property to `true`.
   * 
   * @param id - The ID of the book to borrow.
   * @returns A Promise that resolves to the borrowed book if it exists and is not already borrowed, or `null` otherwise.
   */
  async borrowBook(id: number): Promise<Book | null> {
    console.log('BookRepository.borrowBook');
    const book = await Book.findByPk(id);
    console.log('book:', book);
    if (book && !book.isBorrowed) {
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
