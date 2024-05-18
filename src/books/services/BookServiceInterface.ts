
import Book, { BookCreationAttributes, BookGetAllAttributes} from '../model/Book';

export default interface BookServiceInterface {
  createBook(bookData: BookCreationAttributes): Promise<Book>;
  getAllBooks(): Promise<BookGetAllAttributes[]>;
  getBookById(id: number): Promise<Book | null>;
  borrowBook(id: number): Promise<Book | null>;
  returnBook(id: number, rating: number): Promise<Book | null>;
}
