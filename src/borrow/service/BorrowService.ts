import BorrowServiceInterface from "./BorrowServiceInterface";
import BorrowRepositoryInterface from "../repository/BorrowRepositoryInterface";
import Borrow from "../model/Borrow";

class BorrowService implements BorrowServiceInterface {
    private borrowRepository: BorrowRepositoryInterface;
    
    constructor(borrowRepository: BorrowRepositoryInterface) {
        this.borrowRepository = borrowRepository;
    }

    async borrowBook(userId: number, bookId: number): Promise<Borrow | null> {
        return this.borrowRepository.borrowBook(userId, bookId);
    }

    async returnBook(userId: number, bookId: number, rating: number): Promise<Borrow | null> {
        return this.borrowRepository.returnBook(userId, bookId, rating);
    }
}

export default BorrowService;