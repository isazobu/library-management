
import User, { UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "../repository/UserRepositoryInterface";
import UserServiceInterface from "./UserServiceInsterface";

class UserService implements UserServiceInterface {
    private repository: UserRepositoryInterface;

    constructor(repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    async createUser(user: UserCreationAttributes): Promise<User> {
        return await this.repository.create(user);
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.repository.getById(id);
    }

    async getUsers(): Promise<User[]> {
        return await this.repository.getAll();
    }
}

