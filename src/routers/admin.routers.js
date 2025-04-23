import express from "express";
import { AdminServics } from "../servecis/admin.servecis.js";

const router = express.Router();
const servecis = new AdminServics();

router.post('/register', servecis.sigIn)
    .post('/login', servecis.signUp);

export default router;