import FormCreateTag from "@/app/components/formCreateTag";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Tag',
}

const Page = () => {
    return (
        <div>
            <FormCreateTag />
        </div>
    );
}
export default Page;