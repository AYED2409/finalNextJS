import Footer from "@/app/components/footer";
import ProfileUser from "@/app/components/profileUser";
import { ResultSearch } from "@/app/components/resultSearch";
import { getMyPlaylists, getNumberSubscribersUser, getTotalVideosUser, getUser, getVideoUser } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'User',
}

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { query?: string; page?: string; limit?: string }}) {
    const idUser = params.id;
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;
    const videosUser = await getVideoUser(idUser, `${limit}` , 'date', 'DESC',`${page}`);
    const totalVideos = await getTotalVideosUser(idUser);
    const numberSubscribers = await getNumberSubscribersUser(idUser);
    const playlistUser = await getMyPlaylists(idUser);
    const user = await getUser(idUser);
   
    if (videosUser.error) {
        notFound(); 
    } else {
        return (
            <>
                <ProfileUser user={user} numberSubscribers={numberSubscribers } playlistUser={playlistUser} page={String(page)} limit={String(limit)} totalVideos={totalVideos}/>
                <ResultSearch query={query}/> 
                <Footer /> 
            </>
        )
    }    
}
    