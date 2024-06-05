import ButtonFloat from "./components/buttonFloat";
import Footer from "./components/footer";
import { ResultSearch } from "./components/resultSearch";

export default function Home({ searchParams }: { searchParams?: { query?: string; page?: string }}) {
	const query = searchParams?.query || '';
	const page = searchParams?.page || '';

	return (
    	<main>
    		<ResultSearch query={query} />
      		<ButtonFloat />
      		<Footer />
    	</main>
	)
}

