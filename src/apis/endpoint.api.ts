import { SignupForm } from "@/pages/signup"
import { SigninForm } from "@/pages/signin"
import instance from "@/apis/axios.config";

export const endpoint = {
    auth: {
        login: '/api/auth/login',
        signup: '/api/auth/signup',
        logout: '/api/auth/logout',
        refresh: '/api/auth/refresh-token',
    },
    user: {
        update: '/api/users/update',
        bulkusers: (name: string) => `/api/users/bulk?name=${name}`,
        me: '/api/users/me',
        user: (userName: string) => `/api/users/get/${userName}`,
    },
    account: {
        transfer: '/api/accounts/transfer',
        balance: '/api/accounts/balance',
    }
}


export const signupApi = async (data: SignupForm) => {

    const filtredNull = Object.fromEntries(Object.entries(data).filter(([, v]) => v != ""));
    return await instance.post(endpoint.auth.signup, filtredNull);
}

export const signinApi = async (data: SigninForm) => {
    return await instance.post(endpoint.auth.login, data);
}

export const signoutApi = async () => {
    return await instance.post(endpoint.auth.logout);
}

export const refreshApi = async () => {
    return await instance.get(endpoint.auth.refresh);
}

export const bulkUsersApi = async (name: string) => {
    return await instance.get(endpoint.user.bulkusers(name));
}

export const transferApi = async (data: { to: string, amount: string }) => {
    return await instance.post(endpoint.account.transfer, data);
}

export const balanceApi = async () => {
    return await instance.get(endpoint.account.balance);
}

export const meApi = async () => {
    return await instance.get(endpoint.user.me);
}

export const userApi = async (userName: string) => {
    return await instance.get(endpoint.user.user(userName));
}
