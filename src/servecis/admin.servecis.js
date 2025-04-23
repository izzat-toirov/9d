import Admin from "../models/admin.js";
import { adminValid } from "../utils/admin.valid.js";
import { decode, encode } from "../utils/bcrypt.js";
import { catchError } from "../utils/error.js";
import { generatAccessToken, refreshToken } from "../utils/generat.js";

export class AdminServics {
    async sigIn(req, res) {
        try {
            const { error, value } = adminValid(req.body);
            if(error){
                throw new Error(`Error on create admin: ${error}`);
            }
            const { username, email, password } = value;
            const hashedPassword = await decode(password, 10);
            const newAdmin = await Admin.create({
                username, email, password: hashedPassword
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newAdmin
            });
        } catch (error) {
            catchError(error, res);
        }
    }
    async signUp(req, res) {
        try {
            const { error, value } = adminValid(req.body);
            if(error){
                throw new Error(`Error on create admin: ${error}`);
            }
            const { email, password } = value;
            const admin = await Admin.findOne({ email });
            if(!admin){
                throw new Error("Admin not found");
            }
            const isMatchPassword = await encode(password, admin.password);
            if(!isMatchPassword){
                throw new Error("Invalid password");
            }
            const payload = { id: admin._id, role: admin.role };
            const accesstoken = generatAccessToken(payload);
            const refreshtoken = refreshToken(payload);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: accesstoken, refreshtoken
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}