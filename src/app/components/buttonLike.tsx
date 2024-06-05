"use client";

import { useEffect, useState } from "react";
import { desLike, doLike, getLikes } from "../lib/actions";
import { useSession } from "next-auth/react";
import { Like } from "../lib/definitions";
import { useRouter } from "next/navigation";

export default function ButtonLike({ idVideo, likeList }: { idVideo: string, likeList: Like[] }) {
    const { data: session } = useSession();
    const [likes, setLikes] = useState(likeList);
    const [isLike, setIsLike] = useState(
        likeList.findIndex((like: Like) => like.user.id == session?.user.id && like.video.id == idVideo)
    );
    const router = useRouter();
    
    useEffect(() => {
        const getData = async () => {
            let listLikes = await getLikes();
            setLikes(listLikes);
            setIsLike(
                listLikes.findIndex((like: Like) => like.user.id == session?.user.id && like.video.id == idVideo)
            );
        }
        getData();
    }, [idVideo, session]); 

    const upLike = async () => {
        if(session?.user.token) {
            const res = await doLike(session?.user.token, idVideo);
            let listLikes = await getLikes();
            setLikes(listLikes);
            setIsLike(
                listLikes.findIndex((like: Like) => like.user.id == session?.user.id && like.video.id == idVideo)
            );    
        }
        
    }

    const downLike = async() => {
        if(session?.user.token) {
            const res = await desLike(session?.user.token, likes[isLike].id);
            let listLikes = await getLikes();
            setLikes(listLikes);
            setIsLike(-1);    
        }
        
    }

    if (session?.user) {
        if (isLike < 0) {
            return (          
                <div 
                    className="single-chip index-tag single-video-subutton valign-wrapper " 
                    style={{ cursor: "pointer"}} 
                    onClick={() => upLike()} 
                >
                    <i className="material-symbols-outlined">favorite</i>
                    <p> &nbsp;Like</p>
                </div>         
            );
        } else {
            return (
                <div 
                    className="single-chip index-tag single-video-subutton valign-wrapper color-button" 
                    style={{ cursor: "pointer", color: "white"}}
                    onClick={() => downLike()}  
                >
                    <i className="material-symbols-outlined active ">favorite</i>          
                </div> 
            );       
        }
    } 
    return null;
}