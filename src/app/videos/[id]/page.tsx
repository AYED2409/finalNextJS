import ButtonFloat from "@/app/components/buttonFloat";
import Footer from "@/app/components/footer";
import { ResultSearch } from "@/app/components/resultSearch";
import { VideoComponent } from "@/app/components/video";
import { getVideoWithId } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function Page({ params, searchParams }: { params: { id: string}, searchParams: { query?: string; page?: string; limit?: string}}) {
    const id = params.id;
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const consulta = await getVideoWithId(id);
    
    if (consulta.error) {
        notFound();
    }
    return (
        <>
            <VideoComponent id={id} />
            <ResultSearch query={query} />
            <ButtonFloat />
            <Footer />
        </>
    )
}