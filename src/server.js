import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import AdminRouters from "./routers/admin.routers.js";
import UserRouters from "./routers/user.routers.js"

config();
const app = express();
const PORT = +process.env.PORT;
app.use(express.json());
connectDB();

app.use('/', AdminRouters);
app.use('/user', UserRouters);

app.listen(PORT, ()=> console.log('Server started', PORT));