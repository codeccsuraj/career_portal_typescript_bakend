import Joi, { ObjectSchema } from "joi";

const userSchemaValidate: ObjectSchema = Joi.object().keys({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string().isoDate().required(),
    bio: Joi.string().required(),
    experience: Joi.number().required(),
    alternateNumber: Joi.number(),
    profilePicture: Joi.string(),
    resumeUrl: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        country: Joi.string().required(),
        isPermanent : Joi.boolean()
    }),
    experiences: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        company: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        isActive: Joi.boolean(),
        description: Joi.string().required()
    })),
    education: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        university: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        isActive: Joi.boolean(),
        marks: Joi.string().required()
    })),
    links: Joi.object({
        website: Joi.string().uri(),
        linkedin: Joi.string().uri(),
        github: Joi.string().uri(),
        twitter: Joi.string().uri(),
        portfolio: Joi.string().uri()
    })
});

export {userSchemaValidate};