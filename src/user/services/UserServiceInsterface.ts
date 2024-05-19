import User,{ GetUserDetail, UserCreationAttributes} from "../models/User";

export default interface UserServiceInterface {
    createUser(user: UserCreationAttributes): Promise<User>;
    getUserById(id: number): Promise<GetUserDetail | null>;
    getUsers(): Promise<User[]>;
}
