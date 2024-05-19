import User, { UserAttributes, UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "./UserRepositoryInterface";
import Borrow from "../../borrow/model/Borrow";
import Book from "../../books/model/Book";
import { Sequelize, Op } from "sequelize";
import NotFoundError from "../../errors/NotFoundError";
import redisClient from "../../config/redis";
class UserRepository implements UserRepositoryInterface {
    generateCacheKey(id: number): string {
        return `user-api::user_detail:${id}`;
    }
    
    async getAll(): Promise<User[]> {
        return await User.findAll();
    }

    async getById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async getByIdWithPastBorrows(userId: number) {
      
        let cacheKey = this.generateCacheKey(userId);
        let cacheValue = await redisClient.get(cacheKey);
        if(cacheValue){
            console.log('Cache hit');
            return JSON.parse(cacheValue);
        }
        const user = await User.findByPk(userId, {
          include: [{
            model: Borrow,
            as: 'borrows',  // İlişkide tanımladığımız alias
            include: [{
              model: Book,
              as: 'book',
              attributes: ['name', 'id'],
            }],
            attributes: ['score', 'returnDate']
          }]
        });
      
        if (!user) return null;
      
        console.log('user', user);
        console.log('user.borrows', user.borrows);

        const pastBorrows = user.borrows?.filter(borrow => borrow.returnDate);
        const presentBorrows = user.borrows?.filter(borrow => !borrow.returnDate);
      
        
        const response = {
          id: user.id,
          name: user.name,
          books: {
            past: pastBorrows?.map(borrow => ({
              name: borrow.book?.name,
              score: borrow.score
            })),
            present: presentBorrows?.map(borrow => ({
              name: borrow.book?.name
            }))
            
          
          }
        }
        redisClient.set(cacheKey, JSON.stringify(response));

        return response;
        
      }
      
          
    
    async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }
}

export default UserRepository;