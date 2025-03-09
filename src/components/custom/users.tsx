import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRecoilValueLoadable } from "recoil"
import { bulkUsersAtom } from "@/recoil/atoms/user.atom"

export interface UserWithSendMoneyProps {
    _id: string;
    userName: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    profilePicture?: string;
}

const UserWithSendMoney = ({ firstName, middleName, lastName, profilePicture,userName }: UserWithSendMoneyProps) => {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
                <Avatar>
                    {profilePicture ? (
                        <AvatarImage src={profilePicture} alt={`${firstName} ${middleName} ${lastName}`} />
                    ) : (
                        <AvatarFallback />
                    )}
                </Avatar>
                <div className="text-lg font-bold">{`${firstName} ${middleName} ${lastName}`}</div>
            </div>

            <Link to={`/send/${userName}`}>
                <Button>Send Money</Button>
            </Link>


        </div>
    )
}

const Users = () => {
    const [search, setSearch] = useState<string>("")

    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            {/* user */}
            <div className="flex items-center justify-start text-lg font-bold">
                Users
            </div>
            {/* search Input */}
            <Input type="text" placeholder="Search Users" onChange={(e) => setSearch(e.target.value)} />
            {/* List of Users */}
            {
                search.length > 0 && <ListUsers name={search} />

            }
        </div>

    )
}


const ListUsers = ({ name }: { name: string }) => {
    const users = useRecoilValueLoadable(bulkUsersAtom(name))

    return (
        <>
            {users.state === "hasValue" && users.contents.map((user: UserWithSendMoneyProps) => {
                return <UserWithSendMoney key={user._id} _id={user._id} userName={user.userName} firstName={user.firstName} middleName={user.middleName} lastName={user.lastName} profilePicture={user.profilePicture} />
            })}
        </>
    )
}

export { Users }