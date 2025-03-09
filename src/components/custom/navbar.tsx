import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavbarProps {
    name: string;
    profilePicture?: string;
}
const Navbar = ({name,profilePicture}:NavbarProps) => {

    return (
        <div className="h-16 flex items-center px-4 bg-white shadow-md justify-between">
            {/* title Paytm */}
            <div className="text-3xl font-bold">Paytm</div>
            {/* user profile */}
            <div className="flex items-center gap-2">
                <div className="text-gray-500 text-lg font-bold">Hello {name}</div>
                <Avatar>
                    {profilePicture ? (
                        <AvatarImage src={profilePicture} alt={name} />
                    ) : (
                        <AvatarFallback />
                    )}
                </Avatar>
            </div>
        </div>
    )
}

export { Navbar }
