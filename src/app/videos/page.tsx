import { Metadata } from "next";
import { ListaVideos } from "../components/listaVideos";
import { ResultSearch } from "../components/resultSearch";
import Pagination from "../components/pagination";
import ButtonFloat from "../components/buttonFloat";
import Footer from "../components/footer";
import { getTags, getTotalVideos } from "../lib/actions";
import { Tag } from "../lib/definitions";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Videos',
}

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; limit?: string }}) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;
    const totalVideos = await getTotalVideos();
    const tags = await getTags();
    return (
        <>
            <br />
            <div className="container" style={{ width: "90%" }}>
                <a href="#">
                    <div className="chip index-tag-active">All</div>
                </a>
                {
                    tags.map((tag: Tag) => (
                        <Link href={`/tags/${tag.id}`} key={tag.id} className="chip index-tag">
                            {tag.name}
                        </Link>
                    ))
                }
            </div>
            <ButtonFloat />
            <ListaVideos page={page} limit={limit} total={totalVideos}/>
            <ResultSearch query={query}/>
            {/* <Pagination page={page} limit={limit}/> */}
            <Footer />
        </>
    );
}