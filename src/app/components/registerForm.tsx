"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../lib/actions";

const RegisterForm = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const [username, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [activeLabelUsername,setActiveLabelUsername] = useState('');
	const [activeLabelEmail,setActiveLabelEmail] = useState('');
	const [activeLabelPassword,setActiveLabelPassword] = useState('');
	const [activeLabelPasswordRepeat,setActiveLabelPasswordRepeat] = useState('');
	const router = useRouter();

  	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	setErrors([]);
    	if (password != passwordRepeat) {
      		setErrors(["passwords do not match"])
      		return;
    	}
    	const res = await registerUser(username, email, password);
    	const responseAPI = await res.json();
		if (!res.ok) {
			setErrors(Array.isArray(responseAPI.message) ? responseAPI.message : [responseAPI.message])
		return;
		}
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
		<div className="login-page">
			<div className="container login-container valign-wrapper">
				<div className="row">
					<div className="col s0"></div>
					<div className="col s12">
						<div className="card z-depth-3">
							<div className="card-content">
								<div className="row">
									<div className="col s12">
										<span className="card-title center-align"><b>Register</b></span>
										<br />
										{
											errors.map((error) => (
												<div className="card red darken-1" key={error}>
													<div className="card-content white-text">
														<p>{error}</p>
													</div>
												</div>
											))
										}
										<form onSubmit={handleSubmit}>
											<div className="input-field">
												<input 
													id="username" 
													type="text" 
													className="validate" 
													value={username} 
													onChange={(event) => setUserName(event.target.value)} 
													onFocus={() => setActiveLabelUsername('active')} 
													onBlur={() => { if(username == '') setActiveLabelUsername('') }}
												/>
												<label 
													htmlFor="username"
													className={activeLabelUsername} 
													onClick={() => activeLabelEmail == '' && email != '' ? setActiveLabelUsername('') : setActiveLabelUsername('active')}
												>
													Username
												</label>
											</div>
											<div className="input-field">
												<input 
													id="email" 
													type="email" 
													className="validate" 
													value={email} 
													onChange={(event) => setEmail(event.target.value)} 
													onFocus={() => setActiveLabelEmail('active')} 
													onBlur={() => {if(email == '') setActiveLabelEmail('')}}
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
													id="password" 
													type="password" 
													className="validate" 
													value={password} 
													onChange={(event) => setPassword(event.target.value)} 
													onFocus={() => setActiveLabelPassword('active')} 
													onBlur={() => { if(password == '') setActiveLabelPassword('') }}
												/>
												<label 
													htmlFor="password" 
													className={activeLabelPassword} 
													onClick={() => activeLabelPassword == '' && email != '' ? setActiveLabelPassword('') : setActiveLabelPassword('active')}
												>
													Password
												</label>
											</div>
											<div className="input-field">
												<input 
													id="repassword" 
													type="password" 
													className="validate" 
													value={passwordRepeat} 
													onChange={(event) => setPasswordRepeat(event.target.value)} 
													onFocus={() => setActiveLabelPasswordRepeat('active')} 
													onBlur={() => { if(passwordRepeat == '') setActiveLabelPasswordRepeat('') }}
												/>
												<label 
													htmlFor="repassword" 
													className={activeLabelPasswordRepeat} 
													onClick={() => activeLabelPasswordRepeat == '' && email != '' ? setActiveLabelPasswordRepeat('') : setActiveLabelPasswordRepeat('active')}
												>
													Repeat Password
												</label>
											</div>
											<br />
											<p>
												<label>
													<input type="checkbox" />
													<span>I accept Vidi's <a className="login-link" href="#">Terms of Use</a> and <a className="login-link" href="#">Privacy Policy</a></span>
												</label>
											</p>
											<br />
											<div className="row">
												<div className="col s12">
													<button 
														type="submit" 
														className="waves-effect waves-light btn color-button" 
														style={{ width: "100%" }}
													>
														Register
													</button>
												</div>
											</div>
										</form>  
										Do you have already an account? 
										<Link href={"/login"} className="login-link">Login</Link>
										
									</div>
								</div>
							</div>
							<div className="card-action">
								<Link href={"/"} className="back-button">Back</Link>
									{/* <a className="back-button" href="/">Back</a> */}
							</div>
						</div>
					</div>
					<div className="col s0"></div>
				</div>
			</div>
		</div>
	)
};
export default RegisterForm;
