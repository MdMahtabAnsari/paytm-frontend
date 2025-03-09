import { useEffect } from "react";
import { refreshApi } from "@/apis/endpoint.api";

export const useRefreshToken = () => {
    const refreshToken = async () => {
        await refreshApi();
    }
    useEffect(() => {
        refreshToken();
        const interval = setInterval(refreshToken, 1000 * 60 * 10);
        return () => clearInterval(interval);
    }, []);
};