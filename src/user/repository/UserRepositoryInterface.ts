import User, { UserAttributes, UserCreationAttributes } from "../models/User";
import { Op } from "sequelize";

export default interface UserRepositoryInterface {
    getAll(): Promise<UserAttributes[]>;
    getById(id: number): Promise<UserAttributes | null>;
    create(user: UserCreationAttributes): Promise<UserAttributes>;
}