import { atom } from "recoil";
import { balanceSelector } from "@/recoil/selectors/account.selector";

export const balanceAtom = atom({
    key: "balanceAtom",
    default: balanceSelector,
});

