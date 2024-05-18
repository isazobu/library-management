import Book,{  BookCreationAttributes } from "../model/Book";
import BookRepositoryInterface from "../repository/BookRepositoryInterface";
import BookServiceInterface from "./BookServiceInterface";

class BookService implements BookServiceInterface {
  private bookRepository: BookRepositoryInterface;

  constructor(bookRepository: BookRepositoryInterface) {
    this.bookRepository = bookRepository;
  }

  async createBook(bookData: BookCreationAttributes): Promise<Book> {
    console.log('BookService.createBook')
    return this.bookRepository.createBook(bookData);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.getBookById(id);
  }

  async borrowBook(id: number): Promise<Book | null> {
    return this.bookRepository.borrowBook(id);
  }

  async returnBook(id: number, rating: number): Promise<Book | null> {
    return this.bookRepository.returnBook(id, rating);
  }
}

export default BookService;
