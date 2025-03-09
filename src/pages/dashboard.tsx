import { Users } from "@/components/custom/users";
import { Navbar } from "@/components/custom/navbar";
import { Balance } from "@/components/custom/balance";
import { useRecoilValue } from "recoil";
import { meAtom } from "@/recoil/atoms/user.atom";
import { balanceAtom } from "@/recoil/atoms/account.atom";

const Dashboard = () => {
    const me = useRecoilValue(meAtom);
    const balance = useRecoilValue(balanceAtom);
    return(
        <div className="flex flex-col gap-4">
            <Navbar name={`${me.firstName} ${me.middleName} ${me.lastName}`} />
            <Balance balance={balance.balance} />
            <Users />
            </div>
    )
}

export default Dashboard