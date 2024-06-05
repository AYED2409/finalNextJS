import { redirect } from "next/navigation";
import { getVideoWithId, getCommentsFromVideo, getLikes, getSubscribers,difhora, getVideoUser } from "../lib/actions";
import { Video, VideoTag } from "../lib/definitions";
import TextAreaComment from "./textAreaComment";
import ListaComentarios from "./listaComentarios";
import ButtonLike from "./buttonLike";
import ActionSubscription from "./actionSubscription";
import NumSubscriptions from "./numSubscriptions";
import SelectPlaylist from "./selectPlaylist";
import Image from "next/image";
import Link from "next/link";

export async function Video({ id }: { id: string }) {

    const video: Video = await getVideoWithId(id);
    if (video) {
        const comments = await getCommentsFromVideo(video.id);
        const likeList = await getLikes();
        const subscriptions = await getSubscribers(video.user.id);
        const lastVideos = await getVideoUser(video.user.id, '6', 'date', 'DESC', '1');
        
        return (
            <div className="container single-container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m12 l9">
                            <div className="small-video">
                                <div className="video-container">
                                    <video controls className="responsive-video" >
                                        <source 
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${video.id}/file`} 
                                            type="video/mp4" 
                                            className="index-video-img" 
                                        />
                                    </video>
                                </div>
                            </div>
                            <h6><b>{video.title}</b></h6>
                            <div className="row single-user-info">
                                <div className="col">
                                    <ul className="collection video-card-box">
                                        <li className="collection-item avatar video-card-profile">
                                            <Image 
                                                src={ video.user.image ?`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${video.user.id}` : '/profile-image.jpg'} 
                                                alt="" 
                                                className="circle video-card-user" 
                                                width={300} 
                                                height={300}
                                            />
                                            <p>
                                                <Link href={`/user/${video.user.id}`} className="index-user-link">
                                                    {video.user.username}    
                                                </Link>
                                                <br/>
                                                <span className="subtitle">{subscriptions.length > 1 ? `${subscriptions.length} Subscriptions`: `${subscriptions.length} Subscription`}</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ActionSubscription videoUser={video.user}/>
                                </div>
                            </div>
                            <ul className="single-user-options">
                                <li>
                                    <ButtonLike idVideo={video.id} likeList={likeList}/>
                                </li>
                                <li>
                                    <SelectPlaylist idVideo={video.id}/>        
                                </li>
                            </ul>
                            <br />
                            <br />
                            {video.numLikes} Likes -  Subido hace { difhora(`${video.createAt}`)} 
                            <br />
                            <br />
                            {
                                video.videoTags.map((videoTag: VideoTag) => (
                                    <a key={videoTag.id}>
                                        <div className="chip index-tag dropdown-trigger">{videoTag.tag.name}</div>
                                    </a>
                                ))
                            }
                            <p>{video.description}</p>
                            <br />
                            <ListaComentarios listaComentarios={comments} idVideo={video.id}/>
                        </div>
                        <div className="col s12 m12 l3" style={{ marginTop: "1rem" }}>
                            <div style={{ width: "100%" }}>
                                <h5>latest uploads</h5>
                            </div>
                            <table className="single-list-table">
                                <tbody>
                                    {
                                        lastVideos.length > 0 && (
                                            lastVideos.map((video: Video) => (
                                                <tr key={video.id} className="single-list-item" style={ video.id == id ? {display: "none"} : undefined}>
                                                    <td className="single-list-img-container">
                                                        {
                                                            video.thumbnail ? 
                                                                <Image 
                                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/thumbnail/${video.id}`} 
                                                                    alt="" 
                                                                    className="circle video-card-user" 
                                                                    width={168} 
                                                                    height={94}
                                                                />
                                                                : <div className="single-list-img"></div>
                                                        }
                                                        
                                                    </td>
                                                    <td className="">
                                                        <span className="single-list-title">
                                                            <b>
                                                                <Link href={`/videos/${video.id}`} className="index-video-link">
                                                                    {video.title}
                                                                </Link>
                                                            </b>
                                                        </span>
                                                        <span className="subtitle">
                                                            <Link href={`/user/${video.user.id}`} className="index-user-link">
                                                                {video.user.username}    
                                                            </Link>
                                                            <br />
                                                        </span>
                                                    </td> 
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>            
                            </table>                      
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
    return null;
    
}