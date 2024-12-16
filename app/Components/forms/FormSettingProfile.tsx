"use client";

import React from "react";
import { HiCamera } from "react-icons/hi2";
import { IoMdCalendar } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/app/redux/service/user";

const ProfileSetting = () => {
    const router = useRouter();
    const { data: user, isLoading, error } = useGetMeQuery();
    const userData = user?.payload;

    const handleUpdateProfile = () => {
        router.push("/updateProfile");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        console.error("Error fetching user:", error);
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-lg">Error loading profile. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            <div className="mx-10">
                <h1 className="text-3xl font-normal my-6 text-secondary">Profile Setting</h1>
                <div className="relative w-full h-40 bg-primary rounded-lg mb-16">
                    <div className="absolute -bottom-24 left-20">
                        <div className="relative bg-yellow">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${userData?.avatar}` || "/assets/placeholderProfile.png"} 
                                alt="Profile picture"
                                width={1000}
                                height={1000}
                                className="w-32 h-32 rounded-full border-4 border-white"
                            />
                            <button
                                onClick={handleUpdateProfile}
                                className="text-textprimary absolute bottom-3 left-24 bg-white p-1 rounded-full border"
                            >
                                <HiCamera />
                            </button>
                        </div>

                        <div className="mt-2">
                            <h2 className="font-semibold text-lg text-textprimary">
                                {userData?.username || "N/A"}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {userData?.email || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6">
                    <div className="flex justify-end">
                        <Button onClick={handleUpdateProfile} className="bg-primary hover:bg-emerald-600">
                            Edit
                        </Button>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="text-sm font-normal text-textprimary">
                                    Username
                                </label>
                                <div className="border p-2 bg-[#f9f9f9] rounded-md text-textprimary text-md">
                                    {userData?.username || "N/A"}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-normal text-textprimary">
                                    Email
                                </label>
                                <div className="border p-2 bg-[#f9f9f9] rounded-md text-textprimary text-md">
                                    {userData?.email || "N/A"}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label htmlFor="gender" className="text-sm font-normal text-textprimary">
                                    Gender
                                </label>
                                <div className="border p-2 bg-[#f9f9f9] rounded-md text-textprimary text-md">
                                    {userData?.gender || "N/A"}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="dob" className="text-sm font-normal text-textprimary">
                                    Date of Birth
                                </label>
                                <div className="flex items-center border p-2 bg-[#f9f9f9] rounded-md text-textprimary text-md">
                                    <div className="bg-transparent w-full border-none outline-none text-textprimary">
                                        {userData?.date_of_birth || "N/A"}
                                    </div>
                                    <IoMdCalendar className="text-gray-400 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="bio" className="text-sm font-normal text-textprimary">
                                Bio
                            </label>
                            <div className="border p-2 bg-[#f9f9f9] rounded-md text-textprimary text-md">
                                {userData?.bio || "N/A"}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;
