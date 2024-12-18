"use client";

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
import { DatePickerDemo } from "../calendar/Component";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FILE_SIZE = 1024 * 1024 * 5; // Max file size 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


const validationSchema = Yup.object().shape({
    dob: Yup.date()
        .max(new Date(), "User must be at least 13 years old.")
        .required("Date of birth is required."),
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

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setFieldValue: (field: string, value: File | null) => void
    ): void => {
        e.preventDefault();
    
        const file = e.dataTransfer.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedImage(previewUrl); // Ensure `setSelectedImage` is typed as `(url: string) => void`
            setImageFile(file); // Ensure `setImageFile` is typed as `(file: File | null) => void`
            setFieldValue("avatar", file);
        }
    };
    

    // Toastify Config

    const handleSubmit = async (values: UpdateProfilesTypes) => {
        if (!userData?.uuid) return;

        try {
            // First, upload the image if there's a new one
            if (imageFile) {
                await postUserImage({ uuid: userData.uuid, avatar_url: imageFile }).unwrap();
                console.log("Image uploaded successfully");
                toast.success("Image uploaded successfully")
            }

            // Format the date_of_birth to "YYYY-MM-DDTHH:mm:ss"
            const formatDate = (date: Date | string | null) => {
                if (!date) return null;

                const d = new Date(date);
                const year = d.getFullYear();
                const month = (d.getMonth() + 1).toString().padStart(2, '0');
                const day = d.getDate().toString().padStart(2, '0');
                const hours = d.getHours().toString().padStart(2, '0');
                const minutes = d.getMinutes().toString().padStart(2, '0');
                const seconds = d.getSeconds().toString().padStart(2, '0');

                return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            };

            const formattedDateOfBirth = values.date_of_birth
                ? formatDate(values.date_of_birth)
                : userData?.date_of_birth;

            // Update user information
            await updateUserInfo({
                uuid: userData?.uuid,
                user: {
                    address: values.address || userData?.address,
                    phone_number: values.phone_number || userData?.phone_number,
                    bio: values.bio || userData?.bio,
                    gender: values.gender || userData?.gender,
                    date_of_birth: formattedDateOfBirth || null, // Use formatted date
                    username: values.username || userData?.username,
                },
            }).unwrap();

            toast.success("Profile updated successfully")
            console.log("Profile updated successfully");

            // Check if user has input for password change and handle accordingly
            // if (values.old_password && values.new_password && values.confirm_new_password) {
                // Make sure the new password and confirm password match before calling changePassword
                // if (values.new_password === values.confirm_new_password) {

                //     console.log('old:', values.old_password)
                //     console.log('new:', values.new_password)
                //     console.log("confirm:", values.confirm_new_password)
                //     await changePassword({
                //         changePassword: {
                //             old_password: values.old_password,
                //             new_password: values.new_password,
                //             confirm_new_password: values.confirm_new_password
                //         },
                //     }).unwrap();
                //     console.log("Password changed successfully");
                //     toast.success("Password changed successfully")
                // } else {
                //     console.error("New password and confirm password do not match.");
                //     toast.error("New password and confirm password do not match.")
                // }
            // }

        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile")
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
                        <h1 className="text-3xl my-6 text-secondary font-normal">Profile Setting</h1>

                        <div className="relative w-full h-40 bg-primary rounded-lg mb-16">
                            <div className="absolute -bottom-24 left-20">
                                <div
                                    className="relative border border-2 bg-[#fdfdfd] w-40 h-40 rounded-full "
                                    onDrop={(e) => handleDrop(e, setFieldValue)}
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
                                        type="text"
                                        className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="gender" className="text-textprimary">Gender</label>
                                    <Field
                                        as={Input}
                                        id="gender"
                                        name="gender"
                                        placeholder={userData?.gender || ""}
                                        type="text"
                                        className="text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                    />
                                    <ErrorMessage name="gender" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="dob" className="text-textprimary">Date of Birth</label>

                                    <DatePickerDemo
                                        selectedDate={userData?.date_of_birth}
                                        onDateChange={(date) => {
                                            setFieldValue("date_of_birth", date);  // Send the formatted date back to Formik
                                        }}
                                    />
                                    <ErrorMessage name="dob" component="div" className="text-sm text-red-500" />
                                </div>
                                {/* Old Password Field */}
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
                                    <ErrorMessage name="old_password" component="section" className="text-sm text-red-500" />
                                </div>
                            </div>
                            {/* New Password and Confirm Password Fields */}
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
                                            className="relative text-gray-400 border border-gray-200 focus:ring-primary bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showNewPassword ? <IoEye /> : <IoEyeOff />}
                                        </button>
                                        <ErrorMessage name="new_password" component="section" className="text-sm text-red-500" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirm-password" className="text-textprimary">Confirm Password</label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="confirm_new_password"
                                            className="border border-gray-200 focus:ring-primary bg-white"
                                            name="confirm_new_password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                                        </button>
                                        <ErrorMessage name="old_password" component="section" className="text-sm text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-textprimary">Bio</label>
                                <Field
                                    as="textarea"
                                    id="bio"
                                    name="bio"
                                    placeholder={userData?.bio || ""}
                                    className="text-gray-500 border border-gray-200 focus:ring-primary bg-white w-full p-4 rounded-md text-sm"
                                />
                                <ErrorMessage name="bio" component="div" className="text-sm text-red-500" />
                            </div>
                        </div>

                        <div className="mb-24 flex justify-end">
                            <Button type="submit" className="bg-primary hover:bg-emerald-600">
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
