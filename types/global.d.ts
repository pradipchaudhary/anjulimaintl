declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URI: string;
        JWT_SECRET: string;
        NEXT_PUBLIC_API_BASE?: string;
    }
}
