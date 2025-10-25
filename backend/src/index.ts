import express from 'express';

import cors from 'cors';

import userRoutes from './routes/userRoutes';

import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { prisma } from './database';

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

prisma.post.findMany({})
    .then((posts) => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await prisma.$disconnect();
    process.exit(0)
});