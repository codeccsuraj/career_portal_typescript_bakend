import { Request, Response } from "express";
import { IAdminModel } from "../interfaces/admin.interface";
import { adminServices } from "../services/admin.service";

class AdminController {
    async createAdminModel (req : Request, res : Response):Promise<void> {
        try {
            const data:IAdminModel = req.body;
            const result = await adminServices.createAdminModel(data);
            if (typeof result === 'string') {
                res.status(400).json({ message: result });
            } else {
                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export const adminController = new AdminController();