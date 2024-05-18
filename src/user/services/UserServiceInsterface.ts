import User,{ UserCreationAttributes} from "../models/User";

export default interface UserServiceInterface {
    createUser(user: UserCreationAttributes): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getUsers(): Promise<User[]>;
}
