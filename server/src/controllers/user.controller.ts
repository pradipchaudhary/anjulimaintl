import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUsers = async (_: Request, res: Response) => {
    const users = await User.find().select('-password');
    res.json(users);
};

export const assignRole = async (req: Request, res: Response) => {
    const { role, isVerified } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role, isVerified }, { new: true });
    res.json({ message: 'Role assigned', user });
};
