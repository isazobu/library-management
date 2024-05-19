import BorrowServiceInterface from "./BorrowServiceInterface";
import BorrowRepositoryInterface from "../repository/BorrowRepositoryInterface";
import Borrow from "../model/Borrow";
import BookServiceInterface from "../../books/services/BookServiceInterface";
import redisClient from "../../config/redis";
import {sequelize} from "../../db";
import _ from "lodash";
import CustomError from "../../errors/CustomError";

class BorrowService implements BorrowServiceInterface {
    private borrowRepository: BorrowRepositoryInterface;
    private bookService: BookServiceInterface;

    
    constructor(borrowRepository: BorrowRepositoryInterface, bookService: BookServiceInterface) {
        this.borrowRepository = borrowRepository;
        this.bookService = bookService;
    }

    async borrowBook(userId: number, bookId: number): Promise<void> {
        try {

        const transaction = await sequelize.transaction();
        try {
            await this.bookService.borrowBook(bookId);
            await this.borrowRepository.borrowBook(userId, bookId);
            
           transaction.commit();
            
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.log('error:', error);
        throw new CustomError('Borrow failed', 400);
        
    }

        return;
    }

    async returnBook(userId: number, bookId: number, score: number): Promise<Borrow | null> {
        let totalScore = 0;
        let count = 0;

        const borrow = await Borrow.findOne({
            where: {
                UserId: userId,
                BookId: bookId,
                // returnDate: null,
            },
        });

        if(!borrow) {
            console.log('Borrow not found');
            throw new Error('Borrow not found');
        }

        borrow.returnDate = new Date();
        borrow.score = score;
        await borrow.save();
        
        const redisResult = await redisClient.multi()
        .hIncrBy(`book:${bookId}`, 'score', score)
        .hIncrBy(`book:${bookId}`, 'borrowCount', 1)
        .exec()
   
        if (redisResult) {
            totalScore = Number(redisResult[0])
            count = Number(redisResult[1])
          }
        
          
          if (totalScore !== null && count !== null && count !== 0) {
            const avgScore = totalScore / count;
            await this.bookService.returnBook(bookId, avgScore);
            }
    

        return null;
        
    }
}

export default BorrowService;