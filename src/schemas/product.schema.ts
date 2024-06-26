import Joi, { ObjectSchema } from 'joi';

const productSchemaValidate: ObjectSchema = Joi.object().keys({
    _id: Joi.string(),
    id: Joi.string(),
    adminId: Joi.string().required(),
    email: Joi.string().email().allow(null, ''),
    title: Joi.string().required(),
    basicTitle: Joi.string().required(),
    category: Joi.string().required(),
    jobType: Joi.string().required(),
    workType: Joi.string().required(),
    qualification: Joi.string().required(),
    experience: Joi.string().required(),
    salaryRange: Joi.string().required(),
    subCategory: Joi.array().items(Joi.string()).required(),
    shortDescription: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    ratingCount: Joi.number(),
    ratingSum: Joi.number(),
    ratingCategories: Joi.object({
        quality: Joi.number(),
        value: Joi.number(),
        delivery: Joi.number(),
        customerService: Joi.number()
    }).allow(null, ''),
    profilePicture: Joi.string().allow(null, ''),
    companyName :Joi.string().allow(null, ''),
    companyWebsite :Joi.string().allow(null, ''),
    jobUrl :Joi.string().allow(null, ''),
    jobLocation: Joi.string().required(),
    isReferenceJob: Joi.boolean(),
    openings: Joi.number().required(),
    updatedAt: Joi.date().allow(null, ''),
    emailVerified: Joi.boolean(),
    deviceType: Joi.string().allow(null, ''),
    browserName: Joi.string().allow(null, '')
});

export { productSchemaValidate };
