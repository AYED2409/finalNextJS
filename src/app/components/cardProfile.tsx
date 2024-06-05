"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function CardProfile() {
    const { data: session, status } = useSession();
    
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <Image 
                    className="w-24 h-24 mb-3 mt-4 rounded-full shadow-lg" 
                    width={300}
                    height={300}
                    src={"/profile.jpg"} alt="imagen de perfil">
                </Image>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{session?.user?.username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</span>
                <div className="flex mt-4 md:mt-6">
                    <Link 
                        href={`/profile/${session?.user.id}`} 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        My Videos
                    </Link>
                    <Link 
                        href={`/profile/${session?.user.id}/playlists`} 
                        className="mx-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        My Playlists
                    </Link>
                    <Link 
                        href="/videos/create"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                    >
                        Add Video
                    </Link>
                </div>
            </div>
        </div>

    );
}


