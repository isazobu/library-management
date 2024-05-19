import User, { UserAttributes, UserCreationAttributes } from "../models/User";
import { Op } from "sequelize";

export default interface UserRepositoryInterface {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    create(user: UserCreationAttributes): Promise<User>;
    getByIdWithPastBorrows(id: number);
}