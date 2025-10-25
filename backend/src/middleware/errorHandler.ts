import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    statusCode?: number;
    details?: any;
}

export const errorHandler = (
    error: AppError | any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    // Default error
    let statusCode = 500;
    let message = 'Internal Server Error';
    let details: any = undefined;

    // Handle specific error types
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error)
        // Prisma errors
        if (error.code === 'P2002') {
            statusCode = 409;
            message = 'A record with this value already exists';
            details = { field: error.meta?.target };
        } else if (error.code === 'P2025') {
            statusCode = 404;
            message = 'Record not found';
        } else {
            statusCode = 400;
            message = 'Database error';
            details = { code: error.code };
        }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Invalid data provided';
    } else if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        // Handle custom AppError
        statusCode = error.statusCode;
        message = error.message;
        details = error.details;
    } else if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error';
        details = error.details;
    } else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    } else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(details && { details }),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};


// Async error wrapper
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error: AppError = new Error(`Not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};