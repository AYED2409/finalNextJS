"use client";

import { deleteVideo } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonDeleteVideo({ idVideo }: { idVideo: string }) {
    const router = useRouter();
    const { data: session } = useSession();

    const handlerClick = async () => {
        const res = await deleteVideo(idVideo, session?.user.token)
            //router.push(`/user/${session?.user.id}`)
            router.refresh();
    }
    
    return (
        <div 
            className="waves-effect waves-light btn red lighten-1"
            onClick={handlerClick}
        >
            <i className="material-icons left">delete</i>
            Delete
        </div>
    );
}