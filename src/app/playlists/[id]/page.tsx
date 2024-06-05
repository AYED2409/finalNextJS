import Footer from "@/app/components/footer";
import ReproductorPlaylist from "@/app/components/reproductorPlaylist";
import { ResultSearch } from "@/app/components/resultSearch";
import { getPlaylistVideos } from "@/app/lib/actions";
import { PlaylistVideo } from "@/app/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Playlist',
}

export default async function Page({ params, searchParams }: { params: { id: string}, searchParams?: { query?: string; page?: string; limit?: string } }) {
    const id = params.id;
    const videoList = await getPlaylistVideos(id);
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;

    if (Array.isArray(videoList)) {
        return (
            <>
                <ReproductorPlaylist videoList={videoList} idPlaylist={id} />
                <ResultSearch query={query} />
                <Footer />
            </>
        )
    }
    notFound();
}