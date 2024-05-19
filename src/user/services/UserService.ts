import NotFoundError from "../../errors/NotFoundError";
import User, { UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "../repository/UserRepositoryInterface";
import UserServiceInterface from "./UserServiceInsterface";
import redisClient from '../../config/redis';

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

    async getUserById(id: number): Promise<User | null> {
        //  check if user is in cache
        // const cacheKey = this.generateCacheKey(id);
        // const cacheValue = await redisClient.get(cacheKey);
        // if(cacheValue){
        //     console.log('Cache hit');
        //     return JSON.parse(cacheValue);
        // }
        // //  if not in cache, get from db
        // const user = await this.repository.getById(id);
        // if (!user) {
        //     throw new NotFoundError(`User with id ${id} not found`);
        // }
        //  set cache
        // await redisClient.set(cacheKey, JSON.stringify(user));


        const a = await this.repository.getByIdWithPastBorrows(id);
        
        return a;

    }

    async getUsers(): Promise<User[]> {
        return await this.repository.getAll();
    }
}

export default UserService;