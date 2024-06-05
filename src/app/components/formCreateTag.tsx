"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { createTag } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function FormCreateTag() {
    const { data: session } = useSession();
    const [nameTag, setNameTag] = useState('');
    const [activeLabel, setActiveLabel] = useState('');
    const [errors, setErrors] = useState<string[]>([])
    const [message, setMessage] = useState('');
    const formRef = useRef(null);
    const router = useRouter();

    const handlerSubmit =  async(event: React.FormEvent<HTMLFormElement>) => {
        setErrors([]);
        setMessage('')
        event.preventDefault();
        if(session?.user.token) {
            const res = await createTag(nameTag, session?.user.token);
            if (res.error || res.message) {
                setErrors(Array.isArray(res.error) ? res.message : [res.message])
            } else {{
                setMessage(` ${nameTag} Tag created correctly`)
                formRef.current.reset();
                setNameTag('')
            }}
        }
        
    }

    return (
        <>
            <div className="login-page" style={{ height: "100vh" }}>
                <div className="container login-container valign-wrapper">
                    <div className="row upload-container">
                        <div className="col s0"></div>
                        <div className="col s12">
                            <div className="card z-depth-3">
                                <div className="card-content" style={{ marginTop: '50px' }}>
                                    <div className="row">
                                        <div className="col s12">
                                            <span className="card-title center-align">
                                                <b>Create Tag</b>
                                            </span>
                                            {
                                                errors.map((error) => (
                                                    <div className="card red darken-1" key={error}>
                                                        <div className="card-content white-text">
                                                            <p>{error}</p>
                                                        </div>
                                                    </div>
                                                ))
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
                                            <form onSubmit={handlerSubmit} ref={formRef}>
                                                <div className="input-field create-input">
                                                    <input 
                                                        id="name" 
                                                        type="text" 
                                                        className="validate" 
                                                        onChange={(event) => setNameTag(event.target.value)} 
                                                        onFocus={() => setActiveLabel('active')} 
                                                        onBlur={() => { if (nameTag =='' ) { setActiveLabel('')}}}
                                                    />
                                                    <label 
                                                        htmlFor="name" 
                                                        className={activeLabel} 
                                                        onClick={() => activeLabel == '' && nameTag != '' ? setActiveLabel('') : setActiveLabel('active')}
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
                                                            style={{ width: '100%' }}
                                                        >
                                                            Create
                                                        </button>    
                                                    </div>    
                                                </div>   
                                            </form>   
                                        </div>    
                                    </div>    
                                </div>
                                <div className="card-action">
                                    <span 
                                        className="back-button single-video-subutton" 
                                        onClick={() => router.back()}
                                    >
                                        Back
                                    </span>    
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}