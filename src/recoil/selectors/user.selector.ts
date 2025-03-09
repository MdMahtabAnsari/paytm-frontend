import { selector,selectorFamily } from "recoil";
import { meApi, bulkUsersApi,userApi} from '@/apis/endpoint.api';


export const meSelector = selector({
    key: "meSelector",
    get: async () => {
        const response = await meApi();
        return response.data;
    },
});

export const bulkUsersSelector = selectorFamily({
    key: "bulkUsersSelector",
    get: (name: string) => async () => {
        const response = await bulkUsersApi(name);
        return response.data;
    },
});


export const userSelector = selectorFamily({
    key: "userSelector",
    get: (userName: string) => async () => {
        const response = await userApi(userName);
        return response.data;
    },
});


