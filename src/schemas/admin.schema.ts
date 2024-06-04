import Joi, { ObjectSchema } from 'joi';

export const adminSchema : ObjectSchema = Joi.object().keys(({
  _id: Joi.string(),
  email: Joi.string().email().required(),
  companyName: Joi.string().required(),
  companyAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  startedAt: Joi.date().required(),
  description: Joi.string(),
  GST: Joi.string(),
  companyPan: Joi.string(),
  companyEmail: Joi.string().email(),
  companyContact: Joi.string().required(),
  companyWebsite: Joi.string().uri(),
  numberOfEmployee: Joi.string(),
  service: Joi.array().items(Joi.string()),
  browserName: Joi.string(),
  deviceType: Joi.string(),
  emailVerified: Joi.boolean(),
  emailVerificationToken: Joi.string(),
  otp: Joi.string(),
  otpExpiration: Joi.date(),
  updatedAt: Joi.date(),
}));