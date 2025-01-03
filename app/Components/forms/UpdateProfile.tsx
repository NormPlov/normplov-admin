"use client"

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UpdateProfilesTypes } from "@/types/types";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
    useGetMeQuery,
    useUpdateUserInfoMutation,
    usePostImageMutation,
    useChangePasswordMutation
} from "@/app/redux/service/user";
import { DatePickerDemo } from "../calendar/DatePickerDemo";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    date_of_birth: Yup.date().nullable()
        .max(new Date(), "User must be at least 13 years old."),
       
    bio: Yup.string(),
    old_password: Yup.string(),
    new_password: Yup.string()
        .test(
            "new-password-required",
            "New password is required when old password is provided.",
            function (value) {
                const { old_password } = this.parent; // Access sibling fields
                if (old_password) {
                    return Boolean(value); // Ensure new_password is provided if old_password exists
                }
                return true; // Pass validation if old_password is not provided
            }
        ),
    confirm_new_password: Yup.string()
        .test(
            "confirm-password-match",
            "Passwords must match.",
            function (value) {
                const { new_password } = this.parent; // Access sibling fields
                if (new_password) {
                    return value === new_password; // Ensure confirm_new_password matches new_password
                }
                return true; // Pass validation if new_password is not provided
            }
        )
        .notRequired(),
});


const UpdateProfile = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { data: users } = useGetMeQuery();
    const userData = users?.payload;

    const [changePassword] = useChangePasswordMutation();
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [postUserImage] = usePostImageMutation();

    console.log("uuid", userData?.uuid);
    console.log("Before function handle button")

    const handleSubmit = async (values: UpdateProfilesTypes) => {
        console.log("IN function handle button");
        if (!userData?.uuid) return;
    
        try {
            // Handle image upload
            if (imageFile) {
                await postUserImage({ uuid: userData.uuid, avatar_url: imageFile }).unwrap();
                toast.success("Profile image updated successfully.");
            }
    
            // Handle profile info update
            const updatedInfo: Partial<UpdateProfilesTypes> = {};
    
            if (values.address && values.address !== userData?.address) {
                updatedInfo.address = values.address;
            }
            if (values.phone_number && values.phone_number !== userData?.phone_number) {
                updatedInfo.phone_number = values.phone_number;
            }
            if (values.bio && values.bio !== userData?.bio) {
                updatedInfo.bio = values.bio;
            }
            if (values.gender && values.gender !== userData?.gender) {
                updatedInfo.gender = values.gender;
            }
            if (values.date_of_birth && values.date_of_birth !== userData?.date_of_birth) {
                updatedInfo.date_of_birth = values.date_of_birth;
            }
            if (values.username && values.username !== userData?.username) {
                updatedInfo.username = values.username;
            }
    
            // Ensure only defined fields are sent
            const cleanUpdatedInfo = Object.fromEntries(
                Object.entries(updatedInfo).filter(([ value]) => value !== undefined)
            ) as UpdateProfilesTypes;
    
            if (Object.keys(cleanUpdatedInfo).length > 0) {
                await updateUserInfo({ uuid: userData?.uuid, user: cleanUpdatedInfo }).unwrap();
                toast.success("Profile info updated successfully.");
            }
    
            // Handle password change
            const hasPasswordToUpdate =
                values.old_password && values.new_password && values.confirm_new_password;
    
            if (hasPasswordToUpdate) {
                await changePassword({
                    changePassword: {
                        old_password: values.old_password,
                        new_password: values.new_password,
                        confirm_new_password: values.confirm_new_password,
                    },
                }).unwrap();
                toast.success("Password changed successfully.");
            }
    
            // If nothing was updated
            if (!imageFile && Object.keys(cleanUpdatedInfo).length === 0 && !hasPasswordToUpdate) {
                toast.error("No updates were provided.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile. Please try again.");
        }
    };
    
    
    return (
        <Formik
            initialValues={{
                address: userData?.address || "",
                bio: userData?.bio || "",
                date_of_birth: userData?.date_of_birth || null,
                gender: userData?.gender || "",
                phone_number: userData?.phone_number || "",
                username: userData?.username || "",
                avatar: userData?.avatar || "",
                old_password: "",
                new_password: "",
                confirm_new_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue }) => (
                <Form className="w-full mx-auto">
                    <ToastContainer />
                    <div className="mx-10">
                        <h1 className="text-3xl my-6 text-secondary font-semibold">Profile Setting</h1>

                        <div className="relative w-full h-40 bg-primary rounded-lg mb-16">
                            <div className="absolute -bottom-24 left-20">
                                <div
                                    className="relative border border-2 bg-[#fdfdfd] w-40 h-40 rounded-full"
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
                                            const previewUrl = URL.createObjectURL(file);
                                            setSelectedImage(previewUrl);
                                            setImageFile(file);
                                            setFieldValue("avatar", file);
                                        }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <Image
                                        src={selectedImage || `${process.env.NEXT_PUBLIC_NORMPLOV_API}${userData?.avatar}` || "/assets/placeholderProfile.png"}
                                        alt="Profile picture"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-40 h-40 rounded-full"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/jpg, image/jpeg, image/png, image/gif"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            if (file) {
                                                const previewUrl = URL.createObjectURL(file);
                                                setSelectedImage(previewUrl);
                                                setImageFile(file);
                                                setFieldValue("avatar", file);
                                            }
                                        }}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <button className="text-textprimary absolute bottom-3 right-2 bg-white p-1 rounded-full border">
                                        <HiCamera />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 px-6 mt-32">

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-textprimary">Username</label>
                                    <Field
                                        as={Input}
                                        id="username"
                                        name="username"
                                        placeholder={userData?.username || ""}
                                        className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                                </div>

                                 {/* Gender Select Field */}
                                 <div className="space-y-2">
                                    <label htmlFor="gender" className="text-textprimary">
                                        Gender
                                    </label>
                                    <Field
                                        as="select"
                                        id="gender"
                                        name="gender"
                                        className="text-gray-500 border border-gray-200 focus:ring-primary bg-white w-full p-2 rounded-md text-sm"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="date_of_birth" className="text-textprimary">Date of Birth</label>
                                    <DatePickerDemo
                                        selectedDate={userData?.date_of_birth}
                                        onDateChange={(date) => setFieldValue("date_of_birth", date)}
                                    />
                                    <ErrorMessage name="date_of_birth" component="div" className="text-sm text-red-500" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="oldPassword" className="text-textprimary">Old Password</label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="old_password"
                                            name="old_password"
                                            type={showOldPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showOldPassword ? <IoEye /> : <IoEyeOff />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="old_password" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="new_password" className="text-textprimary">New Password</label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="new_password"
                                            name="new_password"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showNewPassword ? <IoEye /> : <IoEyeOff />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="new_password" component="div" className="text-sm text-red-500" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirm_new_password" className="text-textprimary">Confirm Password</label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="confirm_new_password"
                                            name="confirm_new_password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirm_new_password" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-textprimary">Address</label>
                                    <Field
                                        as={Input}
                                        id="address"
                                        name="address"
                                        placeholder={userData?.address || ""}
                                        className="text-gray-500 border border-gray-200 focus:ring-primary bg-white w-full p-4 rounded-md text-sm"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-sm text-red-500" />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="phone_number" className="text-textprimary">
                                    Phone Number
                                </label>
                                <Field
                                    as={Input}
                                    id="phone_number"
                                    name="phone_number"
                                    placeholder={userData?.phone_number }
                                    className="text-gray-500 border border-gray-200 focus:ring-primary bg-white w-full p-4 rounded-md text-sm"
                                    rows={4} // You can adjust the number of rows as needed
                                />
                                <ErrorMessage name="phone_number" component="div" className="text-sm text-red-500" />
                            </div>
                               
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-textprimary">
                                    Bio
                                </label>
                                <Field
                                    as="textarea"
                                    id="bio"
                                    name="bio"
                                    placeholder={userData?.bio || "Share something about yourself..."}
                                    className="text-gray-500 border border-gray-200 focus:ring-primary bg-white w-full p-4 rounded-md text-sm"
                                    rows={4} // You can adjust the number of rows as needed
                                />
                                <ErrorMessage name="bio" component="div" className="text-sm text-red-500" />
                            </div>
                          

                        </div>

                        <div className="mb-10 flex justify-end">
                            <Button type="submit" className="bg-primary hover:bg-emerald-700">
                                Save
                            </Button>
                        </div>
                    </div>
                   
                </Form>
            )}
        </Formik>
    );
};

export default UpdateProfile;
