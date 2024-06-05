"use client";

import { useSession } from "next-auth/react";
import { deletePlaylist } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function ButtonDeletePlaylist({ idPlaylist, idUser }: { idPlaylist: string, idUser: string }) {
    const {data: session} = useSession();
    const router = useRouter();

    const handlerClick = async () => {
        const res = await deletePlaylist(session?.user.token, idPlaylist);
        router.refresh();
    }

    if (idUser == session?.user.id) {
        return (
            <button 
                type="button"
                className="waves-effect waves-light btn red lighten-1"
                onClick={handlerClick}
            >
                <i className="material-icons left">delete</i>
                Delete
            </button>
        );    
    }
    <i className="material-icons left">delete</i>
            
}