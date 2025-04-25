import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import AdminRouters from "./routers/admin.routers.js";
import UserRouters from "./routers/user.routers.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";
import logger from './utils/logger.js';

logger.info('Server started');
logger.warn('This is a warning');
logger.error('Something went wrong!');


config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database
connectDB();

// Routers
app.use('/admin', AdminRouters);
app.use('/users', UserRouters);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
