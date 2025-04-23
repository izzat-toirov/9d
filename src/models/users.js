
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true }
});

const User = mongoose.model('Users', userSchema);

export default User;