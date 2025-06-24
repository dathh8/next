import { Metadata } from "next";
import React from "react";
import PostTable from "@/components/post-management/PostTable";

export const metadata: Metadata = {
    title: "Post Management",
    description: "Manage your posts efficiently with our comprehensive post management system.",
    // other metadata
};
export default function page() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Post Listing</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    // onClick handler can be added here
                >
                    Add New Post
                </button>
            </div>
            <PostTable/>
        </div>
    );
}
