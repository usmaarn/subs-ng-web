import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";

import { type User } from "@/lib/types";

export const SESSION_KEY = "session"

export type SessionData = {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export const getSession = createServerFn().handler(() => {
    const cookie = getCookie(SESSION_KEY);
    if (!cookie) return null;
    return JSON.parse(cookie) as SessionData;
})

export const setSession = createServerFn()
    .validator((data: Partial<SessionData>) => data)
    .handler(({ data }) => {
        const session = getSession() ?? {};
        const sessionJSON = JSON.stringify({ ...session, ...data });

        setCookie(SESSION_KEY, sessionJSON, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
        });
    })

export const clearSession = createServerFn().handler(() => {
    deleteCookie(SESSION_KEY);
})