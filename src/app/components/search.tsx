'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();
	const params = new URLSearchParams(searchParams);
	const refInput = useRef(null);

	async function handleSearch(term: string) {
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathName}?${params.toString()}`);
	}

  	return (
    	<li style={{ height: "64px" }}>
            <div className="input-field custom-black-text user-index-background tooltipped">
            	<i className="material-icons prefix" onClick={() => refInput.current.focus()}>search</i>
                <input 
					ref={refInput} 
					id="search" 
					type="text" 
					className="validate" 
					style={{ minWidth:"180px" }}
                  	// onBlur={(e) => {e.target.value = ''; params.set('query',''); replace(`${pathName}`)}}
                  	onChange={(e) => {handleSearch(e.target.value);}}  
				/>
            </div>
    	</li>
  	);
}