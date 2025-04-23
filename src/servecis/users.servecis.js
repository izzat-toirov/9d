import User from "../models/users.js";
import { userValid } from "../utils/user.valid.js";
import { catchError } from "../utils/error.js";

export class UserServecis {
    async create(req, res) {
        try {
            const { error, value } = userValid(req.body);
            if(error){
                throw new Error(`Error on user ${error}`);   
            }
            const { name, price } = value;
            const newUser = await User.create({
                name, price
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newUser
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: users
            });
        } catch (error) {
            catchError(error, res);
        }
    }
    async getById(req, res) {
        try {
            const { id } =req.params;
            const user = await User.findById(id);
            if(!user){
                throw new Error("User not fount");
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    async uptadeById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if(!user){
                throw new Error("Admiin not found");
            }
            const uptadeuser = await User.findByIdAndUpdate(id, req.body, {new: true});
            return res.status(200).json({
                statusCode: 200,
                message: 'succes',
                data: uptadeuser
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if(!user){
                throw new Error("Admiin not found");
            }
            const deleted = await User.findByIdAndDelete(id);
            if(!deleted){
                throw new Error("user not found");
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: deleted
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}