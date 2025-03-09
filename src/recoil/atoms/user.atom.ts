import { atom,atomFamily } from "recoil";
import { meSelector,bulkUsersSelector,userSelector } from "@/recoil/selectors/user.selector";


export const meAtom = atom({
    key: "meAtom",
    default: meSelector,
});

export const bulkUsersAtom = atomFamily({
    key: "bulkUsersAtom",
    default: (name: string) => bulkUsersSelector(name),
});

export const userAtom = atomFamily({
    key: "userAtom",
    default: (userName: string) => userSelector(userName),
});


