"use client"

import Image from 'next/image';
import Link from 'next/link';
 
export default function NotFound() {
	
	return (
		<div className="container center-align valign-wrapper" style={{ height: "100%", marginTop: "20vh" }}>
			<div className="row center-align">
				<div className="col s1"></div>
				<div className="col s10">
					<Image src={"/logo_error.png"} alt="logo not found" className='error-img' height={300} width={300}/>
					<h3><b>Error 404: Page not found</b></h3>
					<br />
					<Link href={"/"} className="alt-link">Return to main page</Link>
				</div>
				<div className="col s1"></div>
			</div>
		</div>
  );
}