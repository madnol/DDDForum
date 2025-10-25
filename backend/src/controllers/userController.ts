import { Request, Response } from 'express';

import { prisma } from '../database';
import { Prisma, User } from '@prisma/client';

import { asyncHandler } from '../middleware/errorHandler';



// Validation function
const Errors = {
    UsernameAlreadyTaken: 'Username already taken',
    EmailAlreadyInUse: 'Email already in use',
    ValidationError: 'Validation error',
    ServerError: 'Server error',
    ClientError: 'Client error',
    UserNotFound: 'User not found'
}

function isMissingKeys(data: any, keysToCheckFor: string[]) {
    for (let key of keysToCheckFor) {
        if (data[key] === undefined) return true;
    }
    return false;
}
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function generateRandomPassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const passwordArray = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        passwordArray.push(charset[randomIndex])
    }

    return passwordArray.join('')
}


function parseUserForResponse(user: User) {
    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;
    return returnData;
}

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const keyIsMissing = isMissingKeys(req.body,
        ['email', 'firstName', 'lastName', 'username']
    );

    if (keyIsMissing) {
        return res.status(400).json({
            error: Errors.ValidationError,
            data: undefined,
            success: false
        })
    }

    const userData = req.body;


    // Validate email format
    if (!validateEmail(userData.email)) {
        const error: any = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }

    const emailAlreadyUsed = await prisma.user.findFirst({ where: { email: userData.email } })
    if (emailAlreadyUsed) {
        console.log(emailAlreadyUsed)
        return res.status(409).json({
            error: Errors.EmailAlreadyInUse,
            data: undefined,
            success: false
        })
    }

    const usernameAlreadyTaken = await prisma.user.findFirst({
        where: {
            username: userData.username
        }
    })
    if (usernameAlreadyTaken) {
        return res.status(409).json({
            error: Errors.UsernameAlreadyTaken,
            data: undefined,
            success: false
        })
    }

    try {
        const { user, member } = await prisma.$transaction(async (tx) => {
            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: generateRandomPassword(10)
                }
            });
            const member = await prisma.member.create({
                data: {
                    userId: user.id
                }
            })
            return { user, member }
        })

        res.status(201).json({
            success: true,
            data: parseUserForResponse(user)
        });
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                error.code = '409';
                error.message = 'User with this email or username already exists';
            }
        }
        throw error;
    }
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { email, username, firstName, lastName } = req.body;

    // Validate userId is a number
    if (isNaN(parseInt(userId))) {
        const error: any = new Error('Invalid user ID');
        error.statusCode = 400;
        throw error;
    }

    // Validate email format if provided
    if (email && !validateEmail(email)) {
        const error: any = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }

    const emailAlreadyUsed = await prisma.user.findFirst({ where: { email } })
    const usernameAlreadyTaken = await prisma.user.findFirst({ where: { username } })

    if (emailAlreadyUsed) {
        const error: any = new Error('Email already in use');
        error.statusCode = 409;
        throw error
    }

    if (usernameAlreadyTaken) {
        const error: any = new Error('Username already taken');
        error.statusCode = 409;
        throw error
    }

    try {
        // Check if user exists first
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!existingUser) {
            const error: any = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const user = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                email,
                username,
                firstName,
                lastName
            }
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            data: userWithoutPassword
        });
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                error.code = '409';
                error.message = 'User with this email or username already exists';
            } else if (error.code === 'P2025') {
                error.code = '404';
                error.message = 'User not found';
            }
        }
        throw error;
    }
});


export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        const error: any = new Error('Valid email query parameter is required');
        error.statusCode = 400;
        throw error;
    }

    // Validate email format
    if (!validateEmail(email)) {
        const error: any = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        const error: any = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
        success: true,
        data: userWithoutPassword
    });
});



export const userController = {
    createUser,
    editUser,
    getUserByEmail
}