import { Request, Response } from "express";

import BorrowServiceInterface from "../service/BorrowServiceInterface";
import CustomError from "../../errors/CustomError";

class BorrowController {
    private borrowService: BorrowServiceInterface;

    constructor(borrowService: BorrowServiceInterface) {
        this.borrowService = borrowService;
    }

    async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);

            await this.borrowService.borrowBook(userId, bookId);
            res.status(201).json({ message: 'Book borrowed successfully' });
        } catch (error) {
            console.error('Error in BorrowController.borrowBook:', error);
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to borrow book' });
        }
    }
}

    async returnBook(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const score = parseInt(req.body.score);
            await this.borrowService.returnBook(userId, bookId, score);
            res.json({ message: 'Book returned successfully' });
        } catch (error) {
            console.error('Error in BorrowController.returnBook:', error);
            res.status(500).json({ error: 'Failed to return book' });
        }
    }

}

export default BorrowController;