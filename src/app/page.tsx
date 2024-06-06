import Link from "next/link";
import ButtonFloat from "./components/buttonFloat";
import Footer from "./components/footer";
import Incremental from "./components/incremental";
import { ResultSearch } from "./components/resultSearch";

export default function Home({ searchParams }: { searchParams?: { query?: string; page?: string }}) {
	const query = searchParams?.query || '';
	const page = searchParams?.page || '';

	return (
    	<main>
			<div className="welcome-container">
				<div className="container center-align">
					<h1><b>Welcome to VIDI!</b></h1>
					<h5>Let us show you a bit about us</h5>
					{/* <button className="btn-floating btn-large waves-effect waves-light red play-button">
						<i className="material-icons">play_arrow</i>
					</button> */}
					<Link href={"/videos"} className="btn-floating btn-large waves-effect waves-light red play-button">
						<i className="material-icons">play_arrow</i>
					</Link>
				</div>
			</div>

			<div className="about-container" style={{ overflow: "hidden" }} data-io>
				<div className="container">
					<div className="row" id="about-row1" style={{animation: "slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
						<div className="col s12 m12 l6">
							<div className="about-title">
								<h4><b>Our origins</b></h4>
							</div>
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						</div>
						<div className="col s12 m12 l6"></div>
					</div>
					<br />
					<div className="row" id="about-row2" style={{animation: "slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
						<div className="col s12 m12 l6"></div>
						<div className="col s12 m12 l6">
							<div className="about-title">
								<h4><b>Our mission</b></h4>
							</div>
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						</div>	
					</div>
				</div>
			</div>

			<div className="info-container">
				<div className="container">
					<h5><b>Project stats</b></h5>
					<div className="row">
						<Incremental endNumber={500} duration={1000} title={"Hours invested"}/>
						<Incremental endNumber={3000} duration={1000} title={"Users registered"}/>
						<Incremental endNumber={10000} duration={1000} title={"Videos upliaded"}/>
					</div>	
				</div>
			</div>

			<div className="about-container">
				<div className="container">
					<h4><b>Meet our team</b></h4>
					<div className="row">
						<div className="col s12 m4" style={{animation: "scale-in-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
							<h5>Alvaro Escobar</h5>
							<p><b>Backend Programmer</b></p>
							<p>We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
						</div>
						<div className="col s12 m4" style={{animation: "scale-in-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
							<h5>Andrei</h5>
							<p><b>DB Manager</b></p>
							<p>By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
						</div>
						<div className="col s12 m4" style={{animation: "scale-in-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
							<h5>Alvaro Urbano</h5>
							<p><b>Frontend Designer</b></p>
							<p>We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
						</div>
					</div>
				</div>
			</div>


    		<ResultSearch query={query} />
      		<ButtonFloat />
      		<Footer />
    	</main>
	)
}

