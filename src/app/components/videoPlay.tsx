"use client";

import { useRouter } from "next/navigation";

export default function VideoPlay({ videoPlay, titleVideo }: { videoPlay: string; titleVideo: string; }) {
    const router = useRouter();

    return (
        <div className="card-image">
            <video controls className="max-video-width responsive-video" key={titleVideo}>
                <source src={videoPlay} type="video/mp4" />
            </video>
            <div className="card-content">
                <p><b>{titleVideo}</b></p>
            </div>
        </div>
    );
}