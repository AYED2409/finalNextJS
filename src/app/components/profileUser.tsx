"use client";

import { User, Video } from "../lib/definitions";
import { Playlist } from "../lib/definitions";
import ButtonFloat from "./buttonFloat";
import { difhora, getVideoUser } from "../lib/actions";
import Image from "next/image";
import Link from "next/link";
import ButtonDeleteVideo from "./buttonDeleteVideo";
import { useSession } from "next-auth/react";
import ButtonDeletePlaylist from "./buttonDeletePlaylist";
import Pagination from "./pagination";
import { useEffect, useState } from "react";

export default function ProfileUser({ user, numberSubscribers, playlistUser, page, limit, totalVideos }: { user: User, numberSubscribers: number, playlistUser: [], page: string, limit: string, totalVideos: string }) {
    const {data: session} = useSession();
    const [videos, setVideos] = useState([]);
    const [totalVid, setTotalVid] = useState(totalVideos);

    useEffect(() => {
        const getVideos = async () => {
            const videosUser = await getVideoUser(user.id, `${limit}`, 'date', 'DESC', `${page}`);
            setVideos(videosUser);
        }
        getVideos();
    },[limit, page])

    return(
        <>
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col user-image">
                            <Image 
                                src={ user.image ?`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${user.id}` : '/profile-image.jpg'} 
                                alt="imagen" 
                                width={160} 
                                height={160}
                            />
                        </div>
                        <div className="col">
                            <h3>{user.username}</h3>
                            @{user.username} -  suscriptores: {numberSubscribers} - {totalVid} videos
                        </div>
                    </div>
                    <br />
                    <div className="">
                        <h5>Videos</h5>
                        <div className="row">
                            {
                                videos.length > 0 && (
                                    videos.map((video: Video) => (
                                        <div key={video.id} className="col s12 m6 l4">
                                            <div className="card index-card">
                                                <div className="card-image">
                                                    <video controls className="max-video-width responsive-video" >
                                                        <source 
                                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${video.id}/file`} 
                                                            type="video/mp4" 
                                                            className="index-video-img" 
                                                        />
                                                    </video>
                                                </div>
                                                <div className="card-content video-card-title">
                                                    <ul className="collection video-card-box">
                                                        <li className="collection-item avatar video-card-profile">
                                                            <Image 
                                                                src={ user.image ?`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${user.id}` : '/profile-image.jpg'} 
                                                                alt="" 
                                                                className="circle video-card-user" 
                                                                width={200} 
                                                                height={200}
                                                            />
                                                            <span className="title">
                                                                <b>
                                                                    <Link href={`/videos/${video.id}`} className="index-video-link">
                                                                        {video.title}    
                                                                    </Link>
                                                                </b>
                                                            </span>
                                                            <p>
                                                                <Link href={`/user/${video.user.id}`} className="index-user-link">
                                                                    {user.username}
                                                                </Link>
                                                                <br />
                                                                {video.numLikes} Likes - Subido hace {difhora(video.createAt)}
                                                            </p>
                                                            {
                                                                user.id == session?.user.id && (
                                                                    <div className="row" style={{ marginTop: "20px" }}>
                                                                        <div className="col s6 m6 l6">
                                                                            <Link className="waves-effect waves-light btn color-button" href={`/videos/${video.id}/edit`}>
                                                                                <i className="material-icons left">edit</i>Edit
                                                                            </Link>
                                                                        </div>
                                                                        <div className="col s0 m0 l3"></div>
                                                                        <div className="col s6 m6 l6">
                                                                            <ButtonDeleteVideo idVideo={video.id}/>
                                                                        </div>
                                                                    </div>
                                                                ) 
                                                            }  
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>        
                                    ))
                                )
                            }    
                        </div>
                        <Pagination page={page} limit={limit} total={totalVideos}/>
                    </div>
                    <br />
                    <div className="">
                        <h5>Playlists</h5>
                        <div className="row">
                            { 
                                playlistUser.length > 0 && (
                                    playlistUser.map((playlist: Playlist) => (
                                        <div key={playlist.id} className="col s12 m6 l4">
                                            <div className="card index-card">
                                                <div className="card-image">
                                                    <Image src="/playlist.jpg" 
                                                        alt="imagen de playlis" 
                                                        width={404} 
                                                        height={270}
                                                    />
                                                </div>
                                                <div className="card-content video-card-title">
                                                    <ul className="collection video-card-box">
                                                        <li className="collection-item avatar video-card-profile">
                                                            <Image 
                                                                src={ user.image ?`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${user.id}` : '/profile-image.jpg'} 
                                                                alt="" 
                                                                className="circle video-card-user" 
                                                                width={200} 
                                                                height={200}
                                                            />
                                                            <span className="title">
                                                                <b>
                                                                    <Link href={`/playlists/${playlist.id}`} className="index-video-link">
                                                                        {playlist.name}
                                                                    </Link>
                                                                </b>
                                                            </span>
                                                            <p>
                                                                <Link href={`/user/${user.id}`} className="index-user-link">{user.username}</Link>
                                                                <br />
                                                                Creada hace {difhora(playlist.createAt)} 
                                                            </p>
                                                            <div className="row">
                                                                <div className="col"></div>
                                                                <div className="col s8 m6 l6">
                                                                    <ButtonDeletePlaylist idPlaylist={playlist.id} idUser={user.id}/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ButtonFloat />
        </>
    );
}