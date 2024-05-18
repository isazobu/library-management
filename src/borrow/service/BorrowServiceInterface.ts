
import Borrow from "../model/Borrow";
export default interface BorrowServiceInterface {
    borrowBook(userId: number, bookId: number): Promise<void>;
    returnBook(userId: number, bookId: number, score: number): Promise<Borrow | null>;
}