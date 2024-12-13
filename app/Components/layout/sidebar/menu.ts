import { AiOutlineHome } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlineWorkOutline } from "react-icons/md";
import { PiGraduationCap, PiSignOutBold } from "react-icons/pi";
import { SiScrapy } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";

export const items = [
    {
        icons: AiOutlineHome,
        title: "Home",
        path: "/",
    },
    {
        icons : LuUser2,
        title: "User",
        path: "/user"
    },
    {
        icons : MdOutlineFeedback,
        title: "Feedback",
        path: "/feedback"
    },
    {
        icons : MdHistory,
        title: "Test History",
        path: "/test-history"
    },
    {
        icons : MdOutlineWorkOutline, 
        title: "Jobs",
        path: "/jobs"
    },
    {
        icons: PiGraduationCap,
        title: "Majors & universities",
        path: "/university"
    },
    {
        icons: SiScrapy,
        title: "Scrapping",
        path: "/scrape"
    },
    {
        icons: IoSettingsOutline,
        title: "Setting",
        path: "/setting"
    },
    {
        icons: PiSignOutBold,
        title: "Sign out",
        path: "/signout",
    }
    
]