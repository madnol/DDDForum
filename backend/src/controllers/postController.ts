import { Request, Response } from 'express';

import { prisma } from '../database';

import { asyncHandler } from '../middleware/errorHandler'

const Errors = {
    ClientError: "Client error",
    ServerError: "Server error"
}

const getPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { sort } = req.query;

        if (sort !== 'recent') {
            return res.status(400).json({ error: Errors.ClientError, data: undefined, success: false })
        }

        let postWithVotes = await prisma.post.findMany({
            include: {

                votes: true, // Include associated votes for each post
                memberPostedBy: {
                    include: {
                        user: true
                    }
                },
                comments: true
            },
            orderBy: {
                dateCreated: 'desc', // Sorts by dateCreated in descending order
            }
        })

        return res.json({ error: undefined, data: { postWithVotes }, success: true })
    } catch (error) {
        return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false })
    }
})

export const postController = {
    getPosts
}