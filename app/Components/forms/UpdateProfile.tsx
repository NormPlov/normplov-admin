"use client";

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UpdateProfilesTypes } from '@/types/types';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { HiCamera } from "react-icons/hi2";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


const initialValues: UpdateProfilesTypes = {
    username: "",
    gender: "",
    dob: new Date(),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    bio: ""

};

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date cannot be in the future")
        .test("age", "You must be at least 5 years old", (value) => {
            if (!value) return false;
            const today = new Date();
            const dob = new Date(value);
            let age = today.getFullYear() - dob.getFullYear();
            const month = today.getMonth() - dob.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age >= 5;
        }),
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
    bio: Yup.string()
})


const UpdateProfile = () => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actions.setSubmitting(false); // Mark form as not submitting
                // handleSubmit(values); // Corrected here to handle submit properly
            }}
        >
            <Form className="w-full mx-auto">
                <div className="mx-10">
                    <h1 className="text-3xl my-6 text-secondary font-normal">Profile setting</h1>

                    <div className="relative w-full h-40 bg-primary rounded-lg mb-16 relative ">
                        <div className="absolute -bottom-24 left-20">
                            <div className="relative bg-yellow">
                                <Image
                                    src="/assets/profile.jpg"
                                    alt="Profile picture"
                                    width={1000}
                                    height={1000}
                                    className="w-32 h-32 rounded-full border-4 border-white"
                                />
                                <button className="text-textprimary absolute bottom-0 right-8 bg-white p-1 rounded-full border">
                                    <HiCamera />
                                </button>
                            </div>
                            <div className="mt-2">
                                <h2 className="font-semibold text-lg text-textprimary">Seamey Channtha</h2>
                                <p className="text-sm text-gray-400">seameychanntha@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-6 mt-32">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">

                                <label htmlFor="username" className='text-textprimary'>Username</label>
                                <Field
                                    as={Input}
                                    id="username"
                                    name="username"
                                    placeholder="Admin"
                                    type="text"
                                    className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="section"
                                    className="text-sm text-red-500" />

                            </div>

                            <div className="space-y-2">
                                <label htmlFor="gender" className='text-textprimary'>Gender</label>
                                <Field
                                    as={Input}
                                    id="gender"
                                    name="gender"
                                    placeholder="Female"
                                    type="text"
                                    className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                />
                                <ErrorMessage
                                    name="gender"
                                    component="section"
                                    className="text-sm text-red-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="dob" className="text-textprimary">
                                    Date of birth
                                </label>
                                <Field
                                    as={Input}
                                    id="dob"
                                    name="dob"
                                    placeholder="dob"
                                    type="date"
                                    className="text-gray-400 relative border border-gray-200 focus:ring-primary bg-white flex justify-between"
                                />

                                <ErrorMessage
                                    name="dob"
                                    component="section"
                                    className="text-sm text-red-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="old-password" className='text-textprimary'>Old Password</label>
                                <div className="relative">
                                    <Field
                                        as={Input}
                                        id="oldPassword"
                                        name="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                    /><button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3 top-2.5 "
                                    >
                                        {showOldPassword ? (
                                            <IoEye />
                                        ) : (
                                            <IoEyeOff />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage name='oldPassword' component="section" className="text-sm text-red-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="new-password" className='text-textprimary'>New Password</label>
                                <div className="relative">
                                    <Field
                                        as={Input}
                                        id="newPassword"
                                        name="newPassword"
                                        className="relative text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-2.5"
                                    >
                                        {showNewPassword ? (
                                            <IoEye />
                                        ) : (
                                            <IoEyeOff />
                                        )}
                                    </button>
                                </div>

                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirm-password" className='text-textprimary'>Confirm Password</label>
                                <div className="relative">
                                    <Field
                                        as={Input}
                                        id="confirmPassword"
                                        className="border border-gray-200 focus:ring-primary bg-white"
                                        name="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-2.5"
                                    >
                                        {showConfirmPassword ? (
                                            <IoEye />
                                        ) : (
                                            <IoEyeOff />
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="bio" className='text-textprimary'>Bio</label>
                            <Field
                                as="textarea"
                                name="bio"
                                id="bio"
                                placeholder="Your Bio"
                                className="text-gray-400 border border-gray-200 focus:ring-primary bg-white w-full p-4 rounded-md"
                            />

                        </div>

                        <div className="mb-24">
                        <div className="flex justify-end mb-20">
                            <Button className="bg-primary hover:bg-emerald-600">Save</Button>
                        </div>
                        </div>
                    </div>
                </div>

            </Form>
        </Formik>
    )
}

export default UpdateProfile
