import User, { UserAttributes, UserCreationAttributes } from "../models/User";
import UserRepositoryInterface from "./UserRepositoryInterface";

class UserRepository implements UserRepositoryInterface {
    async getAll(): Promise<UserAttributes[]> {
        return await User.findAll();
    }

    async getById(id: number): Promise<UserAttributes | null> {
        return await User.findByPk(id);
    }

    async create(user: UserCreationAttributes): Promise<UserAttributes> {
        return await User.create(user);
    }
}