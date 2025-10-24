import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/users', userRoutes)

app.use(notFoundHandler);
app.use(errorHandler)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});