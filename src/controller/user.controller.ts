import { Request, Response } from "express";
import { IUserModel } from "../interfaces/user.interface";
import { userServices } from "../services/user.service";

class UserController {
    async createUserDetails(req: Request, res: Response): Promise<void> {
        try {
            const data: IUserModel = req.body;
            const response = await userServices.createUserDetails(data);
            res.status(201).json(response);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const userController =  new UserController();
