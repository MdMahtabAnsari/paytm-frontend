import { selector } from "recoil";
import {balanceApi} from "@/apis/endpoint.api";


export const balanceSelector = selector({
    key: "balanceSelector",
    get: async () => {
        const response = await balanceApi();
        return response.data;
    },
});