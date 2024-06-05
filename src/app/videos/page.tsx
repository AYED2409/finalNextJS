import { Metadata } from "next";
import { ListaVideos } from "../components/listaVideos";
import { ResultSearch } from "../components/resultSearch";
import Pagination from "../components/pagination";
import ButtonFloat from "../components/buttonFloat";
import Footer from "../components/footer";
import { getTotalVideos } from "../lib/actions";

export const metadata: Metadata = {
    title: 'Videos',
}

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; limit?: string }}) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;
    const totalVideos = await getTotalVideos();
    return (
        <>
            <br />
            <div className="container" style={{ width: "90%" }}>
                <a href="#">
                    <div className="chip index-tag-active">All</div>
                </a>
                <a href="#">
                    <div className="chip index-tag">Demo</div>
                </a>
                <a href="#">
                    <div className="chip index-tag">First</div>
                </a>
            </div>
            <ButtonFloat />
            <ListaVideos page={page} limit={limit} total={totalVideos}/>
            <ResultSearch query={query}/>
            {/* <Pagination page={page} limit={limit}/> */}
            <Footer />
        </>
    );
}