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
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { signinApi } from "@/apis/endpoint.api";
import { useNavigate } from "react-router-dom";

export interface SigninForm {
    userName: string;
    password: string;
}

const  SigninPage = () => {
    const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm<SigninForm>();
    const { toast } = useToast();
    const navigate = useNavigate();
    const onSubmit = async(data:SigninForm ) => {
        try{
            await signinApi(data);
            navigate("/dashboard");
        }catch(error){
            if(error instanceof AxiosError){
                toast({
                    variant: "destructive",
                    title: error.response?.statusText,
                    description: error.response?.data.message,
                    duration: 5000,
                });
            }else{
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
                    <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                    <CardDescription className="text-md font-bold text-gray-500 w-11/12 m-auto">Enter your information to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Username</div>
                            <Input
                                type="text"
                                placeholder="Username"
                                {...register("userName", { required: "Username is required" })}
                            />
                            {errors.userName && (
                                <div className="text-red-500 text-sm">{errors.userName.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium text-gray-700">Password</div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm">{errors.password.message}</div>
                            )}
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="mt-4">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center">
                    <div className="w-full text-center">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SigninPage;