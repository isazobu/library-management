import Borrow from '../model/Borrow';


export default interface BookRepositoryInterface {
  borrowBook(userId: number, bookId: number): Promise<Borrow | null>;
  returnBook(userId: number, bookId: number, rating: number): Promise<Borrow | null>;
}
