import Borrow  from '../model/Borrow';
import BorrowRepositoryInterface from './BorrowRepositoryInterface';

class BorrowRepository implements BorrowRepositoryInterface {

    async borrowBook(userId: number, bookId: number): Promise<Borrow | null> {
        const borrow =
         await Borrow.create({
             userId: userId, 
             bookId: bookId,
             borrowDate: new Date(),
             });
        
        return borrow;
        
    }

    async returnBook(id: number): Promise<Borrow | null> {
        const borrow = await Borrow.findByPk(id);
        if (borrow) {
            // borrow.isBorrowed = false;
            await borrow.save();
        }
        return borrow;
    }
}

export default BorrowRepository;