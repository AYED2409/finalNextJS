import RegisterForm from "../components/registerForm";
import { Metadata } from "next";
import { ResultSearch } from "../components/resultSearch";

export const metadata: Metadata = {
	title: 'Register',
}

export default function Page({ searchParams }: { searchParams?: { query?: string; page?: string }}) {
	const query = searchParams?.query || '';
	const page = searchParams?.page || '';
	
	return (
    	<>
      		<RegisterForm />
      		<ResultSearch query={query} />
    	</>
  );
}