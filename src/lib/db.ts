import mongoose from "mongoose";

const MONGODB_URL: string = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
    throw new Error("Please define MONGODB_URL in your .env file.");
}

// Global caching to prevent multiple connections in development
interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URL, {
                bufferCommands: false,
                maxPoolSize: 10,
            })
            .then((db) => db.connection);
    }
    console.log("Connect...")

    try {
        cached.conn = await cached.promise;
        console.log("connected.")
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
