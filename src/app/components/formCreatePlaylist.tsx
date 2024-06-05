"use client";

import { useRef, useState } from "react";
import { createPlaylist } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormCreatePlaylist() {
    const {data: session} = useSession();
    const [namePlaylist, setNamePlaylist] = useState('');
    const [activeLabel, setActiveLabel] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState<string>('');
    const formRef = useRef(null);
    const router = useRouter()
    
    const handlerSubmit = async(event: React.FormEvent<HTMLElement>) => {
    	setErrors([]);
        setMessage('');
        event.preventDefault();
        const body = { name: namePlaylist}
		if(session?.user.token) {
			const res = await createPlaylist(session?.user.token, body);
			if (res.error) {
				setErrors(Array.isArray(res.error) ? res.message : [res.message])
				return;
			}
			if (res.id) {
				setMessage(` ${namePlaylist} Playlist created successfully`);
				setNamePlaylist('')
				formRef.current.reset();
			}
		}
        
    }

    return (   
		<div className="login-page" style={{height: "100vh"}}>
			<div className="container login-container valign-wrapper">
				<div className="row upload-container">
					<div className="col s0"></div>
					<div className="col s12">
						<div className="card z-depth-3">
							<div className="card-content" style={{marginTop: "50px"}}>
								<div className="row">
									<div className="col s12">
										<span className="card-title center-align"><b>Create Playlist</b></span>
										{
											errors.length > 0 && (
												errors.map((error) => (
													<div className="card red darken-1" key={error}>
														<div className="card-content white-text">
														<p>{error}</p>
														</div>
													</div>
												))
											)
										}
										{
											message.length > 0 && (
												<div className="card green lighten-1" key={message}>
												<div className="card-content white-text">
												<p>{message}</p>
												</div>
											</div>
											)
										}
										<form 
											onSubmit={handlerSubmit} 
											ref={formRef}
										>
											<div className="input-field create-input">
												<input 
													id="name" 
													type="text" 
													className="validate" 
													onChange={(event) => setNamePlaylist(event.target.value)} 
													onFocus={() => setActiveLabel('active')} 
													onBlur={() => { if (namePlaylist =='' ) { setActiveLabel('')}}}
												/>
												<label 
													htmlFor="name" 
													className={activeLabel} 
													onClick={() => activeLabel == '' && namePlaylist != '' ? setActiveLabel('') : setActiveLabel('active')}
												>
													Name
												</label>
											</div>
											<br />
											<div className="row">
												<div className="col s12">
													<button 
														type="submit" 
														className="waves-effect waves-light btn color-button" 
														style={{width:"100%"}}
													>
														Create
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="card-action" style={{ marginBottom: "50px" }}>
								<span 
									className="back-button single-video-subutton" 
									onClick={() => {router.back(); router.back()}}
								>
									Back
								</span>
							</div>
						</div>
					</div>
					<div className="col s0"></div>
				</div>
			</div>
		</div>
    );
}