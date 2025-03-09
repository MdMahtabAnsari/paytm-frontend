import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { UserWithSendMoneyProps } from "@/components/custom/users";
import { transferApi } from "@/apis/endpoint.api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface SendMoneyForm {
    amount: string;
}

const UserNameAndImage = ({
    firstName,
    middleName,
    lastName,
    profilePicture,
}: UserWithSendMoneyProps) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar>
                {profilePicture ? (
                    <AvatarImage
                        src={profilePicture}
                        alt={`${firstName} ${middleName} ${lastName}`}
                    />
                ) : (
                    <AvatarFallback />
                )}
            </Avatar>
            <div className="text-lg font-bold">
                {`${firstName} ${middleName} ${lastName}`}
            </div>
        </div>
    );
};

const SendMoneyPage = () => {
    const { userName } = useParams<{ userName: string }>();
    const user = useRecoilValueLoadable(userAtom(userName || ""));
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SendMoneyForm>();
    const { toast } = useToast();
    const navigate = useNavigate();

    const onSubmit = async (data: SendMoneyForm) => {
        try {
            if (user.state === "hasValue") {
                await transferApi({
                    to: user.contents.userName,
                    amount: data.amount,
                });
                toast({
                    title: "Success",
                    description: "Money sent successfully",
                    duration: 5000,
                });
                navigate("/dashboard");

            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: error.response?.statusText,
                    description: error.response?.data.message,
                    duration: 5000,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "An error occurred",
                    duration: 5000,
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="sm:w-96 w-11/12">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Send Money</CardTitle>
                    <CardDescription className="text-md font-bold text-gray-500 w-11/12 m-auto">
                        Enter the amount to send
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user.state === "hasValue" && (
                        <UserNameAndImage
                            _id={user.contents._id}
                            userName={user.contents.userName}
                            firstName={user.contents.firstName}
                            middleName={user.contents.middleName}
                            lastName={user.contents.lastName}
                            profilePicture={user.contents.profilePicture}
                        />
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Amount</div>
                            <Input
                                type="text"
                                placeholder="Amount"
                                {...register("amount", {
                                    required: "Amount is required",
                                    pattern: {
                                    value: /^[0-9]*\.?[0-9]+$/,
                                    message: "Amount should be a number",
                                    },
                                })}
                            />
                            {errors.amount && (
                                <div className="text-red-500 text-sm">
                                    {errors.amount.message}
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 bg-green-500 hover:bg-green-600"
                        >
                            {isSubmitting ? "Sending..." : "Send Money"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SendMoneyPage;
