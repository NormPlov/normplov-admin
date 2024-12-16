"use client";

import React from "react";
import Image from "next/image";
// import { useState } from "react";

const TestHistoryTable = () => {
    const mockData = [
        {
            avatar: "/avatar1.jpg",
            username: "Jane Cooper",
            email: "jane@microsoft.com",
            test: "តេស្ត 1",
            date: "12-04-2024",
            status: "Done",
        },
        {
            avatar: "/avatar1.jpg",
            username: "Jane Cooper",
            email: "jane@microsoft.com",
            test: "តេស្ត 2",
            date: "12-10-2024",
            status: "Draft",
        },
        {
            avatar: "/avatar2.jpg",
            username: "Ronald Richards",
            email: "ronald@adobe.com",
            test: "តេស្ត 2",
            date: "20-10-2024",
            status: "Draft",
        },
        {
            avatar: "/avatar3.jpg",
            username: "Marvin McKinney",
            email: "marvin@tesla.com",
            test: "តេស្ត 2",
            date: "20-11-2024",
            status: "Done",
        },
        {
            avatar: "/avatar3.jpg",
            username: "Kathryn Murphy",
            email: "kathryn@microsoft.com",
            test: "តេស្ត 3",
            date: "20-11-2024",
            status: "Done",
        },
        {
            avatar: "/avatar4.jpg",
            username: "Jacob Jones",
            email: "jacob@yahoo.com",
            test: "តេស្ត 3",
            date: "20-11-2024",
            status: "Done",
        },
        {
            avatar: "/avatar5.jpg",
            username: "Kristin Watson",
            email: "kristin@facebook.com",
            test: "តេស្ត 3",
            date: "20-11-2024",
            status: "Done",
        },
    ];

    // const statusClasses = {
    //     Done: "text-green-600 bg-green-100",
    //     Draft: "text-red-600 bg-red-100",
    // };

    // const [filter, setFilter] = useState("all");
    // const [search, setSearch] = useState("");
    // // Filter logic
//   const filteredUsers =
//   data?.payload?.users?.filter((user) => {
//     const matchesSearch =
//       user.username.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter =
//       filter === "all" ||
//       (filter === "Done" && user.is_active) ||
//       (filter === "Draff" && !user.is_active);
//     return matchesSearch && matchesFilter;
//   }) || [];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-normal text-secondary mb-4">All Test History</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-normal text-textprimary">Avatar</th>
                            <th className="px-4 py-2 text-left text-normal text-textprimary">Username</th>
                            <th className="px-4 py-2 text-left text-normal text-textprimary">Test</th>
                            <th className="px-4 py-2 text-left text-normal text-textprimary">Status</th>
                            <th className="px-4 py-2 text-left text-normal text-textprimary">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((item, index) => (
                            <tr key={index} className="border-t border-gray-200">
                                <td className="px-4 py-2">
                                    <Image
                                        src={item.avatar}
                                        alt={item.username}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <div>
                                        <p className="font-medium">{item.username}</p>
                                        <p className="text-sm text-gray-500">{item.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <div className="bg-orange-100 text-orange-500 rounded-full p-2 mr-2">
                                            📄
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.test}</p>
                                            <p className="text-sm text-gray-500">{item.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        // className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[item.status]}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                    Showing data 1 to 8 of 256K entries
                </p>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">1</button>
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">2</button>
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">3</button>
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">...</button>
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">40</button>
                </div>
            </div>
        </div>
    );
};

export default TestHistoryTable;
