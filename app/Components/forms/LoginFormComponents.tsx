// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoEye, IoEyeOff, IoEyeOffSharp } from "react-icons/io5";
// import { IoEyeSharp } from "react-icons/io5";
// import { Button } from "@/components/ui/button";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";

// type ValueTypes = {
//     email: string;
//     password: string;
// };

// const initialValues: ValueTypes = {
//     email: "",
//     password: "",
// };

// const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Required"),
//     password: Yup.string().required("Required"),
// });

// export default function Login() {

//     const route = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//         // Toggle password visibility
//     };

//     //  handle submit
//     const handleSubmit = (values: ValueTypes) => {
//         setLoading(true);
//         fetch(`http://localhost:3000/api/Login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(values),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("data in login form", data);
//                 setLoading(false);
//                 route.push("/dashboard");
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setLoading(false);
//             });
//     };

//     if (loading) {
//         return (
//             <div className="h-screen flex">
//                 <h1 className="text-6xl text-center">Loading...</h1>
//             </div>
//         );
//     }

//     return (
//         <main className="flex min-h-screen">
//             {/* Left Section */}
//             <div className="hidden flex-col w-1/2 bg-emerald-500 p-12 lg:block">
//                 <div className="space-y-6 text-white">
//                     <h1 className="text-4xl font-bold">សូមស្វាគមន៍មកកាន់</h1>
//                     <h2 className="text-3xl font-bold">គេហទំព័រពិនិត្យផ្ទៀងផ្ទាត់</h2>
//                     <p className="text-lg">
//                         រក្សាទុកពាក្យសម្ងាត់របស់អ្នក និងស្វែងរកព័ត៌មានផ្ទាល់ខ្លួននៅលើគេហទំព័រដែលមានសុវត្ថិភាពបំផុត។
//                     </p>
//                 </div>
//                 <div className="mt-8">
//                     <Image
//                         src={"/public/Secure-login.png"}
//                         alt="Login image"
//                         width={400}
//                         height={400}
//                         className="mx-auto"
//                     />
//                 </div>
//             </div>
//             <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12 bg-white ">
//                 <div className="mx-auto w-full max-w-md space-y-6">
//                     <div className="space-y-2 text-center">
//                         <h2 className="text-3xl font-bold text-primary">ចូលគណនី</h2>
//                     </div>

//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={validationSchema}
//                         onSubmit={(values, actions) => {
//                             // Handle form submission here
//                             setLoading(true);
//                             fetch(`http://localhost:3000/api/Login`, {
//                                 method: "POST",
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                 },
//                                 body: JSON.stringify(values),
//                             })
//                                 .then((res) => res.json())
//                                 .then((data) => {
//                                     console.log("data in login form", data);
//                                     setLoading(false);
//                                     if (data.success) {
//                                         console.log("Success")
//                                     }
//                                 })
                                
//                                 .catch((error) => {
//                                     console.log(error);
//                                     setLoading(false);
//                                 });
//                             actions.setSubmitting(false); // Formik action to indicate form is done submitting
//                         }}
//                     >
//                         {({ isSubmitting }) => (
//                             <Form className="space-y-4">
//                                 <div className="space-y-2 text-textprimary">
//                                     <label htmlFor="email">Email
//                                         <span className="text-red-500 px-1.5">*</span>
//                                     </label>
//                                     <Field
//                                         as={Input}
//                                         id="email"
//                                         name="email"
//                                         placeholder="example@gmail.com"
//                                         type="email"
//                                         className="border border-gray-200 focus:ring-primary bg-white"
//                                     />
//                                     <ErrorMessage
//                                         name="email"
//                                         component="section"
//                                         className="text-sm text-red-500" />
//                                 </div>

//                                 <div className="space-y-2 text-textprimary">
//                                     <label htmlFor="password">Password
//                                         <span className="text-red-500 px-1.5">*</span>
//                                     </label>
//                                     <div className="relative">
//                                         <Field
//                                             as={Input}
//                                             id="password"
//                                             name="password"
//                                             placeholder="Admin@12345"
//                                             type={showPassword ? "text" : "password"}
//                                             className=" border border-gray-200 focus:ring-primary bg-white"
//                                         />
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                                             type="button"
//                                             onClick={handleShowPassword}
//                                         >
//                                             {showPassword ? (
//                                                 <IoEyeOff className="h-4 w-4 text-gray-500" />
//                                             ) : (
//                                                 <IoEyeSharp className="h-4 w-4 text-gray-500" />
//                                             )}
//                                         </Button>
//                                     </div>
//                                     <ErrorMessage
//                                         name="password"
//                                         component="section"
//                                         className="text-sm text-red-500" />

//                                     <div className="text-right">
//                                         <Button variant="link" className="p-0 text-primary text-sm">
//                                             ForgetPassword?
//                                         </Button>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     className="w-full rounded-full bg-primary hover:bg-emerald-500"
//                                     type="submit"
//                                     disabled={isSubmitting} // Prevent multiple submissions
//                                 >
//                                     {isSubmitting ? 'កំពុងដំណើរការ...' : 'ចូលគណនី'}
//                                 </Button>
//                             </Form>
//                         )}
//                     </Formik>

//                 </div>
//             </div>
//         </main>
//     );
// }


"use client";

import React, { useState } from "react";
import Image from "next/image";
import {  IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS

type ValueTypes = {
    email: string;
    password: string;
};

const initialValues: ValueTypes = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

export default function Login() {

    // const route = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading ] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle submit
    // const handleSubmit = (values: ValueTypes) => {
    //     setLoading(true);
    //     fetch(`http://localhost:3000/api/Login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setLoading(false);
    //             if (data.success) {
    //                 // Success Toast
    //                 toast.success("Login successful!", {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //                 route.push("/dashboard");
    //             } else {
    //                 // Error Toast
    //                 toast.error("Login failed. Please try again.", {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setLoading(false);
    //             toast.error("An error occurred. Please try again.", {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         });
    // };

    if (loading) {
        return (
            <div className="h-screen flex">
                <h1 className="text-6xl text-center">Loading...</h1>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen">
            {/* Left Section */}
            <div className="hidden flex-col w-1/2 bg-emerald-500 p-12 lg:block">
                <div className="space-y-6 text-white">
                    <h1 className="text-4xl font-bold">សូមស្វាគមន៍មកកាន់</h1>
                    <h2 className="text-3xl font-bold">គេហទំព័រពិនិត្យផ្ទៀងផ្ទាត់</h2>
                    <p className="text-lg">
                        រក្សាទុកពាក្យសម្ងាត់របស់អ្នក និងស្វែងរកព័ត៌មានផ្ទាល់ខ្លួននៅលើគេហទំព័រដែលមានសុវត្ថិភាពបំផុត។
                    </p>
                </div>
                <div className="mt-8">
                    <Image
                        src={"/public/Secure-login.png"}
                        alt="Login image"
                        width={400}
                        height={400}
                        className="mx-auto"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12 bg-white ">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-primary">ចូលគណនី</h2>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false); // Mark form as not submitting
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
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
                                    disabled={isSubmitting} // Prevent multiple submissions
                                >
                                    {isSubmitting ? 'កំពុងដំណើរការ...' : 'ចូលគណនី'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            {/* Toast Container */}
            <div>
                {/* Toast container must be included once in your app */}
                {/* <toast.Container /> */}
            </div>
        </main>
    );
}
