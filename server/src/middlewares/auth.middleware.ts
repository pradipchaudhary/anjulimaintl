import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token invalid' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });
        if (!req.user.isVerified) return res.status(403).json({ message: 'Account not verified' });
        next();
    };
};
