import Joi from "joi";

const user = Joi.object({
    name: Joi.string().min(3).max(20),
    price: Joi.number().min(10).max(999)
});

export const userValid = (data) => {
    return user.validate(data);
}