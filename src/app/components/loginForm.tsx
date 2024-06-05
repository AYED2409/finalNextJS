"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  	const [errors, setErrors] = useState<string[]>([]);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [activeLabelEmail, setActiveLabelEmail] = useState('');
	const [activeLabelPassword, setActiveLabelPassword] = useState('');
	const router = useRouter();

  	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	setErrors([]);
    	const responseNextAuth = await signIn("credentials", {
     	 	email,
      		password,
      		redirect: false,
    	});

    	if (responseNextAuth?.error) {
      		setErrors(responseNextAuth.error.split(","));
      		return;
    	}
    	router.push("/");
  	};

  	return (
		<div className="login-page" style={{height: "100vh"}}>
			<div className="container login-container valign-wrapper">
				<div className="row">
					<div className="col s0"></div>
					<div className="col s12">
						<div className="card z-depth-3">
							<div className="card-content">
								<div className="row">
									<div className="col s12">
										<span className="card-title center-align"><b>Login</b></span>
										{
											errors.map((error) => (
												<div className="card red darken-1" key={error}>
													<div className="card-content white-text">
														<p>{error}</p>
													</div>
												</div>
											))
										}
										<br/>
										<form onSubmit={handleSubmit}>
											<div className="input-field">
												<input 
													id="email" 
													type="email" 
													className="validate" 
													onChange={(event) => setEmail(event.target.value)} 
													value={email} 
													autoComplete="email de usuario"  
													onFocus={()=> setActiveLabelEmail('active')} 
													onBlur={() => { 
														if(email == '') setActiveLabelEmail('')
														}
													}
												/>
												<label 
													htmlFor="email" 
													className={activeLabelEmail} 
													onClick={() => activeLabelEmail == '' && email != '' ? setActiveLabelEmail('') : setActiveLabelEmail('active')}
												>
													Email
												</label>
											</div>
											<div className="input-field">
												<input 
													minLength={8} 
													id="password" 
													type="password" 
													className="validate" 
													onChange={(event) => setPassword(event.target.value)} 
													value={password} 
													onFocus={() => setActiveLabelPassword('active')} 
													onBlur={() => { if(password == '') setActiveLabelPassword('')}}
												/>
												<label 
													htmlFor="password"  
													className={activeLabelPassword} 
													onClick={() => activeLabelPassword == '' && password != '' ? setActiveLabelPassword('') : setActiveLabelPassword('active')}
												>
													Password
												</label>
											</div>
											<a className="login-link" href="#">I forgot my password</a>
											<br/><br/><br/>
											<div className="row">
												<div className="col s12">
													<button 
														type="submit" 
														className="waves-effect waves-light btn color-button" 
														style={{ width: '100%' }}
													>
														Login in
													</button>
													<br />
												</div>
											</div>
										</form>
										Don't you have already an account? 
										<Link href={"/register"} className="login-link">Register</Link>
										
									</div>
								</div>
							</div>
							<div className="card-action">
								
								<Link href={"/"} className="back-button">Back</Link>
							</div>
						</div>
					</div>
					<div className="col s0"></div>
				</div>
			</div>
		</div>
  	);
};
export default LoginForm;
