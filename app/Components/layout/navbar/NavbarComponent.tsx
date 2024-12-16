"use client"

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/app/redux/service/user";
import { Skeleton } from "@/components/ui/skeleton";


export function NavbarComponent() {
    const { data: user, isLoading, error } = useGetMeQuery();
    console.log("Data In Navbar : ", user)
    const userData = user?.payload;
    if (isLoading) {
        return <div className="flex mx-10 my-5 items-center justify-between">
            <Skeleton className="h-8 w-11/12" />
            <Skeleton className="h-12 w-12 rounded-full" />
        </div>;
    }

    if (error) {
        console.error("Failed to fetch user:", error);
        return <div>Error loading user profile.</div>;
    }

    return (
        <>
            {/* Navbar */}
            <div className="flex h-16 items-center justify-between shadow-sm px-10 py-2 w-full">
                <h1 className="text-xl font-semibold text-textprimary mt-3">
                    Welcome <span className="text-secondary">
                        {userData?.username || "back"}
                    </span>
                </h1>
                <Avatar className="mt-3">
                    <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${userData?.avatar}`|| "/assets/placeholderProfile.png"}
                    />
                    <AvatarFallback>
                        {userData?.username?.[0] || "?"}
                    </AvatarFallback>
                </Avatar>
            </div>
            {/* End Navbar */}
        </>
    );
}
