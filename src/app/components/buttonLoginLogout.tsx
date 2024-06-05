"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ButtonLoginLogout() {
    const { data: session, status } = useSession();
    
    if (session) {
        if(session.user.image) {
            return (
                <>
                    <Link 
                        href={`/user/${session.user.id}`} 
                        className="custom-black-text user-index-background"
                    >
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${session.user.id}`} 
                            alt="imagen usuario" 
                            className="user-index-avatar" 
                            width={42} 
                            height={42}
                        />
                    </Link>
                </>
            )
        } else {
            return (
                <>
                    <Link 
                        href={`/user/${session.user.id}`} 
                        className="custom-black-text user-index-background"
                    >
                        <Image 
                            src="/profile-image.jpg" 
                            alt="imagen usuario" 
                            className="user-index-avatar" 
                            width={42} 
                            height={42}
                        />
                    </Link>
                </>
            )
        }      
    }   
    return(
        <>
            <Link
                className="waves-effect waves-light btn color-button"
                href={"/login"}
            >
                Login
            </Link>
        </>
    );
}