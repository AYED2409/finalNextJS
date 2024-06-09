import Footer from "@/app/components/footer";
import { ResultSearch } from "@/app/components/resultSearch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTag, getTotalVideosTag } from "@/app/lib/actions";
import { ListaVideosTag } from "@/app/components/listaVideosTag";

export const metadata: Metadata = {
	title: 'Tag',
}

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { query?: string; page?: string; limit?: string }}) {
    const idTag = params.id;
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;
    const tag = await getTag(idTag);
    const totalVideos = await getTotalVideosTag(idTag);
   
    if (tag.error) {
        notFound();    
    } else {
        return (
            <>
                <ListaVideosTag idTag={idTag} page={page} limit={limit} total={totalVideos}/>
                <ResultSearch query={query}/> 
                <Footer /> 
            </>
        )
    }    
}
    