"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonRegisterProfile() {
    const { data: session, status } = useSession();

    if (session) {
        return (
            <>
                <Link 
                    href={"/profile"} 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Profile
                </Link>
            </>
        )
    }
    return(
        <>
            <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                href={"/register"}
            >
                Register
            </Link>
        </>
    );
}