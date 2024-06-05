import MyVideosProfile from "@/app/components/myVideos";
import { getMyVideos, getDate } from "@/app/lib/actions";
import { Video } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string} }) {
    const id = params.id;
    const myVideos = await getMyVideos(id)
    //console.log(myVideos);
    if (myVideos.error) {
        notFound();
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MyVideosProfile id={id} videos={myVideos}/>
        </div>
    )
}