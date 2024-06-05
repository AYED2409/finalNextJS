"use client";
import { useSession } from "next-auth/react";
import { User } from "../lib/definitions";
import Link from "next/link";
import ButtonDeleteVideo from "./buttonDeleteVideo";

export default function ActionsVideos({ user, idVideo }: { user: User, idVideo: string }) {
    const { data: session } = useSession();
    if (user.email === session?.user.email) {
        return (
            <div>
                <Link 
                    href={`/videos/${idVideo}/edit`}
                    className="my-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                >
                    Edit
                </Link>
                <ButtonDeleteVideo idVideo={idVideo}/>
            </div>
        );
    }
}