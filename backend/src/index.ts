import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import userRoutes from './routes/userRoutes';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/users', userRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});