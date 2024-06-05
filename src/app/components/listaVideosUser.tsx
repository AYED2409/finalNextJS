"use client";

import { Video } from "../lib/definitions";
import Link from "next/link";
import ButtonLike from "./buttonLike";
import SelectPlaylist from "./selectPlaylist";
import { useEffect, useState } from "react";
import { getLikes } from "../lib/actions";

export default function ListaVideosUser({ videosUser }: { videosUser: Video[] }) {
    const [videos, setVideos] = useState<Video[] | []>([]);
    const [likes, setLikes] = useState([]);
    
    useEffect(() => {
        const getData = async() => {
            const likesList = await getLikes();
            setVideos(videosUser);
            setLikes(likesList);
        }
    getData();
    },[videosUser,likes]);
    
    return(
        <div className="flex flex-wrap">
            {
                videos.map((video: Video) => (
                    <div key={video.id} className="m-4 p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <video controls className="border rounded-lg" >
                            <source src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${video.id}/file`} type="video/mp4" />
                        </video>
                        <div className="p-5">
                            <Link href={`/videos/${video.id}`}>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.title}</h5>    
                            </Link>
                            <ButtonLike idVideo={video.id} likeList={likes}/>
                            <SelectPlaylist idVideo={video.id}/>
                            <div className="flex">
                                {/* <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Creado por:
                                    <Link href={`/user/${video.user.id}`} className="mx-3 font-medium text-blue-600 dark:text-blue-500">{video.user.username}</Link>     
                                    <ActionSubscription videoUser={video.user} />
                                </div> */}
                            </div>
                            <Link 
                                href={`/videos/${video.id}`} 
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                 Ver video completo    
                            </Link>
                        </div>   
                    </div>    
                ))
            }
        </div>
    );
}