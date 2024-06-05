import { IUserModel } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { userSchemaValidate } from "../schemas/user.schema";

class UserService {
    async createUserDetails (data : IUserModel): Promise<IUserModel> {
        try {
            const {error} = userSchemaValidate.validate(data);
            if (error) {
                throw new Error(`Validation error: ${error.details.map((x: any) => x.message).join(', ')}`);
            }

            const response = await UserModel.create(data);
            return response;
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
}

export const userServices = new UserService();