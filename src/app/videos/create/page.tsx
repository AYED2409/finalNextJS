import ButtonFloat from "@/app/components/buttonFloat";
import FormCreateVideo from "@/app/components/formCreateVideo";
import { ResultSearch } from "@/app/components/resultSearch";
import { getCategories, getTags } from "@/app/lib/actions";

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; limit?: string }}) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 6;
    const categories = await getCategories();
    const tags = await getTags();
    
    return (
        <>
            <ResultSearch query={query} />
            <FormCreateVideo categories={categories} tags={tags}/>
            <ButtonFloat />
        </>
    );
}