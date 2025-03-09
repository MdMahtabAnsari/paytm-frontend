import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signupApi } from "@/apis/endpoint.api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AxiosError} from 'axios';

export interface SignupForm {
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
}

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupForm>();
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = async (data: SignupForm) => {
        try {
            await signupApi(data);
            navigate("/signin");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: error.response?.statusText,
                    description: error.response?.data.message,
                    duration: 5000,
                });
            }
            else{
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
                    <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                    <CardDescription className="text-md font-bold text-gray-500 w-11/12 m-auto">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Username</div>
                            <Input
                                type="text"
                                placeholder="Username"
                                {...register("userName", { required: "Username is required" })}
                            />
                            {errors.userName && (
                                <div className="text-red-500 text-sm">
                                    {errors.userName.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">
                                First Name
                            </div>
                            <Input
                                type="text"
                                placeholder="First Name"
                                {...register("firstName", {
                                    required: "First Name is required",
                                })}
                            />
                            {errors.firstName && (
                                <div className="text-red-500 text-sm">
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">
                                Middle Name
                            </div>
                            <Input
                                type="text"
                                placeholder="Middle Name"
                                {...register("middleName")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Last Name</div>
                            <Input
                                type="text"
                                placeholder="Last Name"
                                {...register("lastName")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Password</div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full text-center">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-500">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupPage;
