import * as React from "react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function NavbarComponent() {
    return (<>
        {/* navbar  */}
        <div className="flex h-16 items-center justify-between shadow-sm px-10 py-2 w-full">
            <h1 className="text-xl font-semibold text-textprimary mt-3">
                Welcome <span className="text-secondary ">Seamey Channtha</span>
            </h1>
            <Avatar className="mt-3">
                <AvatarImage src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
        </div>
        {/* end navbar */}
    </>

    )
}



