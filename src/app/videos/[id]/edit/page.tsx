import ButtonFloat from "@/app/components/buttonFloat";
import FormEditVideo from "@/app/components/formEditVideo";
import { getCategories, getTags, getVideoWithId } from "@/app/lib/actions";

export default async function Page({ params }: { params: { id: string }}) {
    const categories = await getCategories();
    const tags = await getTags();
    const video = await getVideoWithId(params.id)
    
    return (
        <>
            <FormEditVideo categories={categories} video={video} tags={tags}/>
            <ButtonFloat />
        </> 
    )
}