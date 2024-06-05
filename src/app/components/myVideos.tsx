import { getDate } from "../lib/actions";
import { Video } from "../lib/definitions";
import ActionsVideos from "./actionsVideos";

export default function MyVideosProfile({ id, videos }: { id: string, videos: [] }) {
    if (videos.length > 0) {
        return (
            videos.map((video: Video) => (
                <div key={video.id} >
                    <div>
                        <div className="h-auto max-w-full rounded-lg border">
                            <video controls className="border rounded-lg ">
                                <source src={`${process.env.URL_SERVER}/videos/${video.id}/file`} type="video/mp4" />
                            </video>
                            <span>Titulo: {video.title}</span><br/>
                            <span>Subido el: {getDate(video.createAt)}</span>
                            <ActionsVideos user={video.user} idVideo={video.id}/>
                        </div>
                    </div>
                </div>
            ))
        );
    }
}