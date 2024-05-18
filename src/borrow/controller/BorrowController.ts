import { Request, Response } from "express";

import BorrowServiceInterface from "../service/BorrowServiceInterface";

class BorrowController {
    private borrowService: BorrowServiceInterface;

    constructor(borrowService: BorrowServiceInterface) {
        this.borrowService = borrowService;
    }

    async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            console.log('userId:', userId);
            console.log('bookId:', bookId);
            await this.borrowService.borrowBook(userId, bookId);
            res.status(201).json({ message: 'Book borrowed successfully' });
        } catch (error) {
            console.error('Error in BorrowController.borrowBook:', error);
            res.status(500).json({ error: 'Failed to borrow book' });
        }
    }

    async returnBook(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const rating = parseInt(req.body.rating);
            await this.borrowService.returnBook(userId, bookId, rating);
            res.json({ message: 'Book returned successfully' });
        } catch (error) {
            console.error('Error in BorrowController.returnBook:', error);
            res.status(500).json({ error: 'Failed to return book' });
        }
    }

}

export default BorrowController;