import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'admin' | 'hr' | 'reception' | 'agent' | 'operation';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    isVerified: boolean;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'hr', 'reception', 'agent', 'operation'], default: 'agent' },
    isVerified: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);
