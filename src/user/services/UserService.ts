import NotFoundError from "../../errors/NotFoundError";
import User, { GetUserDetail, UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "../repository/UserRepositoryInterface";
import UserServiceInterface from "./UserServiceInsterface";
import redisClient from '../../config/redis';
import Borrow from "../../borrow/model/Borrow";

class UserService implements UserServiceInterface {
    
    private generateCacheKey(id: number): string {
        return `user-api::user:${id}`;
    }
    

    
    private repository: UserRepositoryInterface;


    constructor(repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    async createUser(user: UserCreationAttributes): Promise<User> {
        return await this.repository.create(user);
    }

    async getUserById(id: number): Promise<GetUserDetail | null> {
        let cacheKey = this.generateCacheKey(id);
        let cacheValue = await redisClient.get(cacheKey);
        if(cacheValue){
            console.log('Cache hit');
            return JSON.parse(cacheValue);
        }

        const user = await this.repository.getByIdWithPastBorrows(id);
        
        if (!user) {
            throw new NotFoundError('User not found');
        }
      

        const pastBorrows = user.borrows?.filter((borrow: Borrow) => borrow.returnDate);
        const presentBorrows = user.borrows?.filter((borrow: Borrow) => !borrow.returnDate);
      
        
        const response: GetUserDetail = {
            id: user.id,
            name: user.name,
            books: {
                past: pastBorrows?.map((borrow: Borrow) => ({
                    name: borrow.book?.name || '',
                    score: borrow.score || 0
                })) ?? [],
                present: presentBorrows?.map((borrow: Borrow) => ({
                    name: borrow.book?.name || ''
                })) ?? []
                
            
            }
        }

        return response;

    }

    async getUsers(): Promise<User[]> {
        return await this.repository.getAll();
    }
}

export default UserService;