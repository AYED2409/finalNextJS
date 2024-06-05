"use client";

import { useRef, useState } from "react";
import { createCategory } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormCreateCategory() {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [activeLabel, setActiveLabel] = useState('');
    const [errors, setErrors] = useState<string[]>([])
    const [message, setMessage] = useState<string>('');
    const router = useRouter();
    const formRef = useRef(null);

    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrors([]);
        setMessage('');
        event.preventDefault();
        if(session?.user.token) {
            const res = await createCategory(name, session?.user.token);
            if (res.error) {
                setErrors(Array.isArray(res.error) ? res.message : [res.message])
            } else {
                setMessage(`Category ${res.name} created correctly`);
                if(formRef.current){
                    formRef.current.reset();    
                }
                setName('');
            }
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
                                            <b>Create Category</b>
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
                                        </span>
                                        <form onSubmit={handlerSubmit} ref={formRef}>
                                            <div className="input-field create-input">
                                                <input 
                                                    id="name" 
                                                    type="text" 
                                                className="validate" 
                                                    onChange={(event) => setName(event.target.value)} 
                                                    onFocus={() => setActiveLabel('active')} 
                                                    onBlur={() => { if (name =='' ) { setActiveLabel('')}}}
                                                />
                                                <label 
                                                    htmlFor="name" 
                                                    className={activeLabel} 
                                                    onClick={() => activeLabel == '' && name != '' ? setActiveLabel('') : setActiveLabel('active')}
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
                                                        style={{width: '100%'}}
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