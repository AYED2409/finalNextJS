"use client";

import { useEffect, useState } from "react";
import { getLikes, difhora, getVideosWithTag } from "../lib/actions";
import { VideosWithTag } from "../lib/definitions";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./pagination";

export function ListaVideosTag({ idTag, page, limit, total }: { idTag: string, page: string | number, limit: string | number, total: string | number }) {
    const [videos, setVideos] = useState([]);
    const [likes, setLikes] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const videos = await getVideosWithTag(idTag, `${page}`, `${limit}`)
            const likes = await getLikes();
            setVideos(videos);
            setLikes(likes);
        }
        getData();
    },[page, limit])
    
    return (
        <div className="container video-card-container" >
            <div className="section">
                <div className="row">
                    {
                        videos.map((videoTag: VideosWithTag) => (
                            <div key={videoTag.id} className="col s12 m6 l4">
                                <div className="card index-card">
                                    <div className="card-image">
                                        <video controls className="max-video-width responsive-video" >
                                            <source 
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${videoTag.video.id}/file`} 
                                                type="video/mp4" 
                                                className="index-video-img"
                                            />
                                        </video>
                                    </div>
                                    <div className="card-content video-card-title">
                                        <ul className="collection video-card-box">
                                            <li className="collection-item avatar video-card-profile">
                                                <Image 
                                                    src={videoTag.video.user.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${videoTag.video.user.id}` : '/profile-image.jpg'} 
                                                    alt="" 
                                                    className="circle video-card-user" 
                                                    width={300}  
                                                    height={300}
                                                />
                                                <span className="title">
                                                    <b>
                                                        <Link 
                                                            href={`/videos/${videoTag.video.id}`} 
                                                            className="index-video-link"
                                                        >
                                                            {videoTag.video.title}
                                                        </Link>
                                                    </b>
                                                </span>
                                                <p>
                                                <Link href={`/user/${videoTag.video.user.id}`} className="index-user-link">
                                                    {videoTag.video.user.username}
                                                </Link>
                                                <br />
                                                <span className="subtitle">{`${videoTag.video.numLikes} likes`} - hace { difhora(`${videoTag.video.createAt}`)}</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    }  
                </div>
            </div>
            <Pagination page={String(page)} limit={String(limit)} total={String(total)}/>
        </div> 
    )
}