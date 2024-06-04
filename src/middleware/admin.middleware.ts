import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { Roles } from "../enums/auth.enum";

dotenv.config()
// Middleware to check user privileges
export const checkUserPrivileges = (requiredRoles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            const userRole = decoded.role; // Assuming the role is part of the JWT payload

            // Also check role from request header if necessary
            const headerRole = req.headers['role'] as Roles;

            if (!requiredRoles.includes(userRole) && (!headerRole || !requiredRoles.includes(headerRole))) {
                return res.status(403).json({ message: 'Forbidden: Insufficient role' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
};
