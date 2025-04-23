import Joi from "joi";

const admin = Joi.object({
    username: Joi.string().min(3).max(20),
    email: Joi.string().email().max(21),
    password: Joi.string().min(8)
});

export const adminValid = (data) => {
    return admin.validate(data);
}