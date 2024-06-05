import ButtonFloat from "@/app/components/buttonFloat";
import FormEditUser from "@/app/components/formEditUser";
import { ResultSearch } from "@/app/components/resultSearch";
import { getUser } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function Page({ params, searchParams }: { params: { id: string}, searchParams: { query?: string; page?: string; limit?: string }}) {
    const user = await getUser(params.id);
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    
    if (user.error) {
        return notFound();
    }
    return (
        <>
           <FormEditUser user={user} />
           <ResultSearch query={query} />
           <ButtonFloat />
        </>
    )
}