import BadRequestError from "../../errors/BadRequestError";
import NotFoundError from "../../errors/NotFoundError";
import Book,{  BookCreationAttributes, BookGetAllAttributes } from "../model/Book";
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

  async getAllBooks(): Promise<BookGetAllAttributes[]> {
    return this.bookRepository.getAllBooks();
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.getBookById(id);
  }

  async borrowBook(id: number): Promise<Book | null> {

    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      throw new NotFoundError('Book not found');
    } 
    if (book.isBorrowed) {
      throw new BadRequestError('Book is already borrowed');
    }

    book.isBorrowed = true;
    await this.bookRepository.save(book);

    return book;
    
  }

  async returnBook(id: number, rating: number): Promise<Book | null> {
    this.bookRepository.returnBook(id, rating);
    return this.bookRepository.returnBook(id, rating);
  }
}

export default BookService;
