import User, { GetUserDetail, UserAttributes, UserCreationAttributes } from "../models/User";
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

    async getByIdWithPastBorrows(userId: number): Promise<User | null> {
      
      
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
      
    
        return user;
        
      }
      
          
    
    async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }
}

export default UserRepository;