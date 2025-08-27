import mongoose, { Document, Schema } from 'mongoose';

// 1️⃣ TypeScript Interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// 2️⃣ Mongoose Schema
const UserSchema: Schema = new Schema<IUser>(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// 3️⃣ Export Model
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
