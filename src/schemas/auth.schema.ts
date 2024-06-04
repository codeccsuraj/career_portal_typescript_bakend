import Joi, { ObjectSchema } from "joi";
import bcrypt from "bcrypt";

// Define a custom validation function for bcrypt hashing
const hashPassword = (value: string, helpers: Joi.CustomHelpers<string>) => {
    try {
        const hashedPassword = bcrypt.hashSync(value, 10); // Hash the password using bcrypt
        return hashedPassword;
    } catch (error) {
        return helpers.error("any.custom");
    }
};

const authSchemaValidation: ObjectSchema = Joi.object({
    _id: Joi.string().uuid().required(),
    id: Joi.string().uuid().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).custom(hashPassword, 'Bcrypt Hash').required(),
    mobile: Joi.string().required(),
    country: Joi.string().required(),
    profilePicture: Joi.string().uri().allow(null).optional(),
    isEmailVerified: Joi.boolean().required(),
    isMobiltOtpVerified: Joi.boolean().required(),
    browserType: Joi.string().required(),
    emailResentOtp: Joi.boolean().required(),
    mobileResendOtp: Joi.boolean().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required()
});

export default authSchemaValidation;
