"use client";

import { useEffect, useState } from "react";
import { PlaylistVideo, Video } from "../lib/definitions";
import { useSession } from "next-auth/react";
import { deleteVideoToPlaylist, getPlaylistVideos } from "../lib/actions";
import { useRouter } from "next/navigation";
import VideoPlay from "./videoPlay";
import ButtonFloat from "./buttonFloat";
import Link from "next/link";

export default function ReproductorPlaylist({ videoList, idPlaylist }: { videoList: PlaylistVideo[], idPlaylist: string }) {
    let videoInicial = "";
    let videoTitle = ""
    let id = "";
    let total = 0;
    if (videoList.length > 0) {
        videoInicial = `${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${videoList[0].video.id}/file`;
        videoTitle = videoList[0].video.title;
        id = videoList[0].id;
        total = videoList.length;
    } else {
        videoInicial = '';
        videoTitle = ''
        id = "";
    }
    const router = useRouter();
    const { data: session } = useSession();
    const [videoPlay, setVideoPlay] = useState<string>(videoInicial);
    const [titleVideo, setTitleVideo] = useState<string>(videoTitle);
    const [listVideos, setListVideos] = useState(videoList);
    const [idVideoPlaylist, setIdVideoPlaylist] = useState(id)
    const [totalVideos, setTotalVideos] = useState(total);

    useEffect(()=> {
        const getData = async () => {
            const listaVideos = await getPlaylistVideos(idPlaylist);
            setListVideos(listaVideos);
        }
        getData();
    },[idVideoPlaylist, totalVideos])

    const handlerPlay = (idVideo: string, title:string, idVideoPlay: string) => {
        setTitleVideo(title);
        setVideoPlay(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${idVideo}/file`)
        setIdVideoPlaylist(idVideoPlay)
        // router.refresh();
    }

    const deleteVideoPlaylist = async(idPlaylistVideo: string) => {
        const res = await deleteVideoToPlaylist(session?.user.token, idPlaylistVideo);
        setTotalVideos(totalVideos-1);
        // console.log(res);
        // router.refresh();
    }

    if (videoList.length == 0) {
        return (
            <div className="row" style={{height: "60vh"}}>
                <div className="col s0 m3 l3"></div>
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image orange lighten-1">
                            <br/>
                        </div>
                        <div className="card-content orange lighten-1">
                            <p>El usuario No ha Agregado videos a esta Playlist </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12 m4 l4">
                        <ul className="collection">
                            {
                                listVideos.map((playlistVideo: PlaylistVideo) => (
                                    <li key={playlistVideo.id} className="collection-item avatar">
                                        <i className="material-icons circle blue darken-3">ondemand_video</i>
                                        <span>
                                            <p>
                                                <b>{playlistVideo.video.title}</b>
                                                <br/>
                                                <Link href={`/user/${playlistVideo.video.user.id}`} className="index-user-link">
                                                    @{playlistVideo.video.user.username}
                                                </Link>  
                                            </p>
                                        </span>
                                        <br/>
                                        {
                                            idVideoPlaylist != playlistVideo.id && (   
                                                <button 
                                                    className="secondary-content  waves-effect waves-light btn blue darken-3" 
                                                    onClick={() => handlerPlay(playlistVideo.video.id, playlistVideo.video.title, playlistVideo.id)}
                                                >
                                                    <i className="material-icons">play_arrow</i>
                                                </button>  
                                            )
                                        }                                        
                                    </li>
                                ))
                            }  
                        </ul>    
                    </div>
                    <div className="col s12 m8 l8 20">
                        <div className="card omdex-card">
                            <VideoPlay videoPlay={videoPlay} titleVideo={titleVideo} />
                        </div>
                    </div>
                </div>
            </div>
            <ButtonFloat />
        </div>
    );
}