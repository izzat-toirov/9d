import express from "express";
import { UserServecis } from "../servecis/users.servecis.js";
import { JwtAuthGuard } from "../middleware/jwt.guard.js";

const router = express.Router();
const servecis = new UserServecis();

router.post('/', servecis.create)
    .get('/', JwtAuthGuard, servecis.getAll)
    .get('/:id', servecis.getById)
    .put('/:id', servecis.uptadeById)
    .delete('/:id', servecis.delete);

export default router;