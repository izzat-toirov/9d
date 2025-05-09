
import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true } );

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;