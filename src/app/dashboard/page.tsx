"use client";
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session, status } = useSession();
    if(status === 'loading') {
        return <p>loading...</p>;
    }
    console.log(session);
    const getMyVideos = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/myVideos`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.user?.token}`,
            },
        })
        const data = await res.json();
        console.log(data);
    }

    return (
        <div>
            <p>pagina dashboard</p>
            <pre>
                <code>{JSON.stringify(session,null, 2)}</code>
            </pre>
            <button onClick={getMyVideos}>Get my Videos</button>
        </div>
    );
}

export default Page;