'use client';
 
import Link from 'next/link';
import { useEffect } from 'react';
 
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
	console.error(error);
	}, [error]);
 
  return (
	<div className="container center-align valign-wrapper" style={{ height: "100%", marginTop: "20vh" }}>
			<div className="row center-align">
				<div className="col s1"></div>
				<div className="col s10">
					
					<h3><b>Something went wrong!</b></h3>
					<br />
					<div className="single-video-subutton" onClick={() => reset()}>
						<i className="material-icons " style={{fontSize: "6em", color: "#1e88e5"} }>refresh</i>
						<br />
						<b>Try again</b>
						
					</div>
					<br />
					<Link href={"/"} className="alt-link">Return to main page</Link>
				</div>
				
				<div className="col s1"></div>
			</div>
		</div>
  );
}