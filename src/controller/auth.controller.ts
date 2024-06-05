import { Request, Response } from "express";
import { IAuthUser, ILoginUser } from "../interfaces/auth.interface";
import { authServices } from "../services/auth.service";

class AuthController {
    async addUser(req : Request, res : Response) : Promise<void> {
        try {
            const data: IAuthUser = req.body;
            const response = await authServices.addUser(data);

            if (typeof response === 'string') {
                if (response === 'Email already exists' || response === 'Mobile number already exists') {
                    res.status(400).json({ success: false, message: response });
                } else {
                    res.status(500).json({ success: false, message: response });
                }
            } else {
                res.status(201).json({ success: true, message: "User added successfully", user: response });
            }
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async verifyUserEmail (req : Request, res : Response):Promise<void> {
        try {
            const {otp} = req.body;
            const response = await authServices.verifyUserEmail(otp)
             // Send appropriate HTTP status code based on the response
             if (response.token) {
                res.status(200).json(response); // Success
            } else {
                res.status(400).json(response); // Error
            }
        } catch (error) {
            console.error('Error in verifying email:', error);
            res.status(500).json({ message: 'Internal server error', loading: false, token: '', user: null });
        }
    }

    async authenticateUser(req : Request, res : Response): Promise<void> {
        try {
            const {email, password} = req.body as ILoginUser;
            const response = await authServices.authenticateUser({email, password});
            if (response.user === null) {
                res.status(401).json({ success: false, message: response.message });
            } else {
                res.status(200).json({ success: true, message: response.message, token: response.token, user: response.user });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            const result = await authServices.forgotPassword(email);
            if (result === 'User not found') {
                return res.status(404).json({ message: result });
            }
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async resetPassword (req: Request, res : Response):Promise<any> {
        try {
            const {otp, password} = req.body;
            const response  = await authServices.resetPassword(otp, password);
            return res.status(200).json({ message: response });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const authController = new AuthController();