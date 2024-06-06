export default function Footer() {
    return (
    	<footer className="page-footer color-button  blue darken-1">
    		<div className="container">
        		<div className="row">
          			<div className="col l6 s12">
            			<h5 className="white-text">Company Bio</h5>
            			<p className="white-text">We are a team of college students working on this project like it&apos;s our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
          			</div>
          			<div className="col l3 s12">
            			<h5 className="white-text">Menu</h5>
            			<ul>
							<li><a className="white-text" href="#!">Home</a></li>
							<li><a className="white-text" href="#!">About us</a></li>

            			</ul>
          			</div>
          			<div className="col l3 s12">
            			<h5 className="white-text">Legal</h5>
            			<ul>
							<li><a className="white-text" href="#!">Privacy Policy</a></li>
							<li><a className="white-text" href="#!">Terms of Use</a></li>
            			</ul>
          			</div>
        		</div>
      		</div>
      		<div className="footer-copyright">
        		<div className="container">
          			Made by Materialize
        		</div>
      		</div>
    	</footer>
    )
}