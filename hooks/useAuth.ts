// hooks/useAuth.ts
import api from "@/services/apiClient";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/auth/me").then((res) => setUser(res.data)).catch(() => setUser(null)).finally(() => setLoading(false));
    }, []);

    return { user, loading, setUser };
}
