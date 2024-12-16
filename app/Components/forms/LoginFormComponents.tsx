"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/app/redux/hooks";
import { setAccessToken, setUserRole } from "@/app/redux/features/auth/authSlice";
import { LoginType } from "@/types/types";

const initialValues: LoginType = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

export default function Login() {

    const dispatch = useAppDispatch()
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Toastify Config
    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    // Handle submit
    const handleSubmit = async (values: LoginType) => {
        setLoading(true);
        toast.info("Login Processing!", toastConfig);

        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                toast.success("Login Successfully!", toastConfig);
                const data = await res.json();
                
                    console.log("You are admin")
                    if (data?.payload?.access_token) {
                        console.log("ACCESS TOKEN : ", data.payload.access_token);
                        dispatch(setAccessToken(data.payload.access_token))
                        dispatch(setUserRole(data?.payload?.roles));
                        router.refresh()
                        router.push("/")
                        console.log("data", data)
                    }
               
            } else {
                // meaning the credential can be incorrect!
                switch (res.status) {
                    case 401:
                        toast.error("Incorrect Password!", toastConfig);
                        break;
                    case 404:
                        toast.error("User not found!", toastConfig);
                        break;
                    case 403:
                        toast.warn("You need to be an admin to access this page!", toastConfig);
                        break;
                    default:
                        toast.error("Something went wrong!", toastConfig);
                        break;
                }
            }
        } catch (error) {
            console.log("There is an error when login : ", error);
            toast.error("An unexpected error occurred.", toastConfig);
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="flex min-h-screen ">
            <ToastContainer />
            
            <div className="hidden flex-col w-[700px] bg-primary px-20 pt-12 lg:block relate">
                <div className="space-y-6 text-white ">
                    <h1 className="text-5xl font-bold">សូមស្វាគមន៍មកកាន់</h1>
                    <h2 className="text-5xl font-bold">គេហទំព័រនាំផ្លូវ</h2>
                    <p className="text-lg font-normal">
                        រក្សាទុកពាក្យសម្ងាត់របស់អ្នក និងស្វែងរកព័ត៌មានផ្ទាល់ខ្លួននៅលើគេហទំព័រដែលមានសុវត្ថិភាពបំផុត។
                    </p>
                </div>
                <div className="">
                    <Image
                        src={"/assets/login.png"}
                        alt="Login image"
                        width={1000}
                        height={1000}
                        className="w-[550px] h-[478px] ml-[120px] absolute"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12 ">
                <div className="mx-auto w-full max-w-md space-y-6 ">
                    <div className="space-y-2 text-center">
                        <h2 className="text-4xl font-bold text-primary">Login</h2>
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
                                <div className="space-y-2 text-textprimary ">
                                    <label htmlFor="email">Email
                                        <span className="text-red-500 px-1.5">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        type="email"
                                        className="border border-gray-200 focus:ring-primary bg-white"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="section"
                                        className="text-sm text-red-500" />
                                </div>
                                <div className="space-y-2 text-textprimary">
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
                                            className=" border border-gray-200 focus:ring-primary bg-white"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            type="button"
                                            onClick={handleShowPassword}
                                        >
                                            {showPassword ? (
                                                <IoEyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <IoEyeSharp className="h-4 w-4 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="section"
                                        className="text-sm text-red-500" />
                                    <div className="text-right">
                                        <Button variant="link" className="p-0 text-primary text-sm">
                                            ForgetPassword?
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    className="w-full rounded-full bg-primary hover:bg-emerald-500"
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
           
            {/* } */}
        </main>
    );
}
