import { Request, Response } from "express";
import User, { UserCreationAttributes } from "../models/User";
import UserServiceInterface from "../services/UserServiceInsterface";
import CustomError from "../../errors/CustomError";

class UserController {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserCreationAttributes = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error in UserController.createUser:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getUsers();
            res.json(users);
        } catch (error) {
            console.error('Error in UserController.getAllUsers:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUserById(parseInt(req.params.id));
            res.json(user);
        } catch (error) {
            if(error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.error('Error in UserController.getUserById:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
}

export default UserController;