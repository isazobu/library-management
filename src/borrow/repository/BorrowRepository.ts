import Borrow  from '../model/Borrow';
import BorrowRepositoryInterface from './BorrowRepositoryInterface';

class BorrowRepository implements BorrowRepositoryInterface {

    async borrowBook(id: number): Promise<Borrow | null> {
        const borrow = await Borrow.findByPk(id);
        if (borrow) {
            // borrow.isBorrowed = true;
            await borrow.save();
        }
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