"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { setAccessToken, setUserRole } from "@/app/redux/features/auth/authSlice";
import { LoginType } from "@/types/types";
import { useToast } from "@/hooks/use-toast"


const initialValues: LoginType = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

export default function Login() {
    const { toast } = useToast()

    const dispatch = useAppDispatch()
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle submit
    const handleSubmit = async (values: LoginType) => {
        setLoading(true);
        // toast.info("Login Processing!", toastConfig);

        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
           
                const data = await res.json();

                console.log("You are admin")
                if (data?.payload?.access_token) {
                    console.log("ACCESS TOKEN : ", data.payload.access_token);
                    dispatch(setAccessToken(data.payload.access_token))
                    dispatch(setUserRole(data?.payload?.roles));
                    toast({
                        title: "Logged in Successfully 🎉",
                        description: "Your action was completed successfully.",
                        variant: "default",
                        duration: 3000,
                      })
                    // router.refresh()
                    router.push("/")
                    console.log("data", data)
                }

            } else {
                // meaning the credential can be incorrect!
                switch (res.status) {
                    case 401:
                        toast({
                            variant: "destructive",
                            description: "Incorrect Password!"
                        });
                        break;
                    case 404:
                        toast({
                            description: "User not found!",
                            variant: "destructive"
                        });
                        break;
                    case 403:
                        toast({
                            description:"You need to be an admin to access this page!", 
                            variant: "warning"
                         });
                        break;
                    default:
                        toast({
                            description: "Something went wrong!",
                            variant: "destructive"
                        });
                        break;
                }
            }
        } catch (error) {
            console.log("There is an error when login : ", error);
            toast({
                description: "An unexpected error occurred.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="flex min-h-screen ">

            <div className="hidden flex-col bg-primary/10 px-20 pt-12 lg:block relate w-[900px]">

                <div className="mt-5">
                    <Image
                        src={"/assets/2.png"}
                        alt="Login image"
                        width={1000}
                        height={1000}
                        className="px-10 "
                    />
                </div>
                <div className="space-y-6 text-textprimary mt-8 text-center">
                    <h1 className="text-4xl font-bold">សូមស្វាគមន៍មកកាន់គេហទំព័រ E-Found</h1>
                    <h2 className="text-4xl font-bold"></h2>
                    <p className="text-lg font-normal">
                        រក្សាទុកពាក្យសម្ងាត់របស់អ្នក និងស្វែងរកព័ត៌មានផ្ទាល់ខ្លួននៅលើគេហទំព័រដែលមានសុវត្ថិភាពបំផុត។
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12 ">
                <div className="mx-auto w-full max-w-md space-y-6 ">
                    <div className="space-y-2 text-center">
                        <h2 className="text-5xl font-bold text-primary">Login</h2>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false); // Mark form as not submitting
                            handleSubmit(values); // Corrected here to handle submit properly
                        }}
                    >
                        {() => (
                            <Form className="space-y-4 ">
                                <div className="space-y-3 text-textprimary text-md">
                                    <label htmlFor="email">Email
                                        <span className="text-red-500 px-1.5">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        type="email"
                                        className="w-full border border-gray-300 text-lg rounded-lg px-4 py-5 focus:ring-primary bg-white"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="section"
                                        className="text-sm text-red-500" />
                                </div>
                                <div className="space-y-2 text-textprimary mb-4  text-md">
                                    <label htmlFor="password">Password
                                        <span className="text-red-500 px-1.5">*</span>
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            placeholder="Admin@12345"
                                            type={showPassword ? "text" : "password"}
                                            className="w-full border border-gray-300 text-lg rounded-lg px-4 py-5 focus:ring-primary bg-white"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            type="button"
                                            onClick={handleShowPassword}
                                        >
                                            {showPassword ? (
                                                <IoEyeSharp className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <IoEyeOff className="h-5 w-5 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="section"
                                        className="text-sm text-red-500" />
                                    {/* <div className="text-right">
                                        <Button variant="link" className="p-0 text-primary text-sm">
                                            Forget Password?
                                        </Button>
                                    </div> */}
                                </div>
                                <Button
                                    className="w-full border border-gray-300 text-lg px-4 py-5 focus:ring-primary bg-white rounded-full bg-primary hover:bg-emerald-500 mt-5 "
                                    type="submit"
                                    disabled={loading} // Prevent multiple submissions
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </main>
    );
}
