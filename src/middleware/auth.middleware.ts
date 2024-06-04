// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthUser from '../models/auth.model';
import { IJwtPayload } from '../interfaces/auth.interface';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1); // Exit the application if JWT_SECRET is not set
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as IJwtPayload;

        const user = await AuthUser.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token: User not found' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(400).json({ success: false, message: 'Invalid token' });
    }
};
