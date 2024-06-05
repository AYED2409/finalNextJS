"use client"

import { useState } from "react"
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";
import { login, updateUser, updateUserImage } from "../lib/actions";
import { useSession } from "next-auth/react";
import { url } from "inspector";
import Image from "next/image";

export default function FormEditUser({ user }: { user: User }) {
    const [username, setUserName] = useState<string>(user.username);
    const [activeLabelUsername, setActiveLabelUsername] = useState('active');
    const [email, setEmail] = useState<string>(user.email);
    const [activeLabelEmail, setActiveLabelEmail] = useState('active');
    const [actualPassword, setActualPassword] = useState<string>('');
    const [activeLabelActualPassword, setActiveLabelActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [activeLabelNewPassword, setActiveLabelNewPassword] = useState('');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const {data: session} = useSession();

    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
        setMessage('');
        let hasError = false;

        if (actualPassword == '') {
            setErrors(['Current password is required']);
            hasError = true;
        } else {
            const data = await verifyPassword(email, actualPassword);
            if (data.statusCode == 401 || data.statusCode == 400) {
                setErrors([data.message])
                hasError = true;
            }
        }

        if (image != null) {
            if (session?.user.token) {
                const form = new FormData();
                form.append('image', image);
                const setImage = await updateUserImage(session?.user.token, form);
                if (setImage.message) {
                    setErrors([setImage.message]);
                    hasError = true;
                }
            }
            
        }

        if (!hasError) {
            if(session?.user.token) {
                let body: { username: string; email: string; password?: string } = { username, email };
                if (newPassword.length > 0) {
                    body.password = newPassword;
                }
                const res = await updateUser(user.id, session?.user.token, body);
                if (res.affected) {
                    setMessage('data updated correctly')
                    setActualPassword('')
                } else {
                    setErrors(res.message)
                }
            }
            
        }
    }

    const verifyPassword = async(email: string, password: string) => {
        const isCorrectPassword = await login(email, password);
       return isCorrectPassword;
    }

    return (
        <div className="login-page">
                <div className="container login-container valign-wrapper">
                    <div className="row upload-container">
                        <div className="col s0"></div>
                        <div className="col s12">
                            <div className="card z-depth-3">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s12">
                                            <span className="card-title center-align">
                                                <b>Edit profile</b>
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
                                            <br/>
                                            <form onSubmit={handlerSubmit}>
                                                <div className="row valign-wrapper">
                                                    <div className="col s6">
                                                        <div className="input-field create-input">
                                                            <input 
                                                                id="username" 
                                                                type="text" 
                                                                className="validate" 
                                                                onChange={(event) => setUserName(event.target.value)} 
                                                                value={username} 
                                                                autoComplete="username" 
                                                                onFocus={()=> setActiveLabelUsername('active')} 
                                                                onBlur={()=> { if(username == '') setActiveLabelUsername('')}}
                                                            />
                                                            <label 
                                                                htmlFor="username" 
                                                                className={activeLabelUsername} 
                                                                onClick={() => activeLabelUsername == '' && username != '' ? setActiveLabelUsername('') : setActiveLabelUsername('active')}
                                                            >
                                                                UserName
                                                            </label>
                                                        </div>
                                                        <div className="input-field create-input">
                                                            <input 
                                                                id="email" 
                                                                type="email" 
                                                                className="validate" 
                                                                onChange={(event) => setEmail(event.target.value)} 
                                                                value={email} 
                                                                autoComplete="email de usuario"  
                                                                onFocus={()=> setActiveLabelEmail('active')} 
                                                                onBlur={()=> { if(email == '') setActiveLabelEmail('')}}
                                                            />
                                                            <label 
                                                                htmlFor="email" 
                                                                className={activeLabelEmail} 
                                                                onClick={() => activeLabelEmail == '' && email != '' ? setActiveLabelEmail('') : setActiveLabelEmail('active')}
                                                            >
                                                                Email
                                                            </label>
                                                        </div> 
                                                        <div className="input-field create-input">
                                                            <input 
                                                                id="actualPassword" 
                                                                type="password" 
                                                                className="validate" 
                                                                onChange={(event) => setActualPassword(event.target.value)} 
                                                                value={actualPassword} 
                                                                autoComplete="old password"  
                                                                onFocus={()=> setActiveLabelActualPassword('active')} 
                                                                onBlur={()=> { if(actualPassword == '') setActiveLabelActualPassword('')}}
                                                            />
                                                            <label 
                                                                htmlFor="actualPassword" 
                                                                className={activeLabelActualPassword} 
                                                                onClick={() => activeLabelActualPassword == '' && actualPassword != '' ? setActiveLabelActualPassword('') : setActiveLabelActualPassword('active')}
                                                            >
                                                                Current Password
                                                            </label>
                                                        </div>

                                                        <div className="input-field create-input">
                                                            <input 
                                                                id="newPassword" 
                                                                type="password" 
                                                                className="validate" 
                                                                onChange={(event) => setNewPassword(event.target.value)} value={newPassword} 
                                                                autoComplete="old password" 
                                                                onFocus={()=> setActiveLabelNewPassword('active')} 
                                                                onBlur={()=> { if(newPassword == '') setActiveLabelNewPassword('')}}
                                                            />
                                                            <label 
                                                                htmlFor="newPassword" 
                                                                className={activeLabelNewPassword} 
                                                                onClick={() => activeLabelNewPassword == '' && newPassword != '' ? setActiveLabelNewPassword('') : setActiveLabelNewPassword('active')}
                                                            >
                                                                New Password
                                                            </label>
                                                        </div>
                                                        <div className="file-field input-field">
                                                            <div className="btn color-button">
                                                                <span>Image</span>
                                                                <input 
                                                                    type="file" 
                                                                    name="image" 
                                                                    accept="image/jpg" 
                                                                    onChange={(event) => {
                                                                            const selectFile = event.target.files?.[0];
                                                                            if (selectFile) {
                                                                                setImage(selectFile);
                                                                            }
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="file-path-wrapper">
                                                                <input className="file-path validate" type="text" defaultValue={image?.name}/>
                                                            </div>
                                                        </div>
                                                        <br/>

                                                        <div className="row">
                                                            <div className="col s12">
                                                                <button 
                                                                    type="submit" 
                                                                    className="waves-effect waves-light btn color-button" 
                                                                    style={{ width: '100%' }}
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>     
                                                    </div>
                                                    <div className="col s2"></div>
                                                    <div className="col s4">
                                                        {
                                                            user.image && image ? (
                                                                <div className="previewImage" style={{backgroundImage: `url(${URL.createObjectURL(image)})`}}></div>
                                                            ) : !user.image && image ? (
                                                                <div className="previewImage" style={{backgroundImage: `url(${URL.createObjectURL(image)})`}}></div>
                                                            ) : user.image ? (
                                                                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${user.id}`} height={160} width={160} alt="imagen"/>
                                                            ) : (
                                                                <div className="previewImage"></div>
                                                            )
                                                        } 
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <a 
                                        className="back-button dropdown-trigger" 
                                        onClick={() => router.back()}
                                    >
                                        Back
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}