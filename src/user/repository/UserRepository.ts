import User, { UserAttributes, UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "./UserRepositoryInterface";

class UserRepository implements UserRepositoryInterface {
    async getAll(): Promise<User[]> {
        return await User.findAll();
    }

    async getById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }
}