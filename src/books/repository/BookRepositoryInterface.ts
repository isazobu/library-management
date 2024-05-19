import  Book, {  BookAttributes, BookCreationAttributes, BookGetAllAttributes } from '../model/Book';



export default interface BookRepositoryInterface {
  findById(id: number): Promise<Book | null>;
  save(book: Book): Promise<Book>;
  createBook(bookData: BookCreationAttributes): Promise<Book>;
  getAllBooks(): Promise<BookGetAllAttributes[]>;
  getBookById(id: number): Promise<Book | null>;
  returnBook(id: number, rating: number): Promise<Book | null>;
}
