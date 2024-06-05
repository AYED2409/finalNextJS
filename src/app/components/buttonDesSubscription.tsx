"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import { desSubscription } from "../lib/actions";
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";

export default function ButtonDesSubscription({ user }: { user: User} ) {
    const { data: session } = useSession();
    const router = useRouter();
    
    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (session?.user.token) {
            event.preventDefault();
            const res = await desSubscription(session?.user.token,user.id)
            // router.refresh();    
        }
        
    }

    if (session?.user) {
        return (
            <form onSubmit={handlerSubmit}>
                <button className="waves-effect red lighten-1 btn color-button" style={{ marginTop: "0.5rem" }}>
                    Cancel Subscription
                </button>
            </form>
        );
    }

    return (
        <Link href={"/login"} className=" mx-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Login
        </Link>
    );
}