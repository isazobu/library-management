import BorrowServiceInterface from "./BorrowServiceInterface";
import BorrowRepositoryInterface from "../repository/BorrowRepositoryInterface";
import Borrow from "../model/Borrow";
import BookServiceInterface from "../../books/services/BookServiceInterface";

class BorrowService implements BorrowServiceInterface {
    private borrowRepository: BorrowRepositoryInterface;
    private bookService: BookServiceInterface;

    
    constructor(borrowRepository: BorrowRepositoryInterface, bookService: BookServiceInterface) {
        this.borrowRepository = borrowRepository;
        this.bookService = bookService;
    }

    async borrowBook(userId: number, bookId: number): Promise<void> {
        await this.bookService.borrowBook(bookId);
        await this.borrowRepository.borrowBook(userId, bookId);

        return;
    }

    async returnBook(userId: number, bookId: number, rating: number): Promise<Borrow | null> {
        return this.borrowRepository.returnBook(userId, bookId, rating);
    }
}

export default BorrowService;