import LoginForm from "../components/loginForm";
import { Metadata } from "next";
import { ResultSearch } from "../components/resultSearch";

export const metadata: Metadata = {
	title: 'Login',
}

export default function Page({ searchParams }: { searchParams?: { query?: string; page?: string }}) {
	const query = searchParams?.query || '';
  	const page = searchParams?.page || '';
  	
	return (
		<>
			<ResultSearch query={query} />
			<LoginForm />
		</>
  	);
}