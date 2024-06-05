"use client";

import { difhora, getDate } from "../lib/actions";
import { Comment } from "../lib/definitions";
import { useSession } from "next-auth/react";
import FormEditComment from "./formEditComment";
import { useEffect, useState } from "react";
import TextAreaComment from "./textAreaComment";
import Image from "next/image";

export default function ListaComentarios({ listaComentarios, idVideo }: { listaComentarios: Comment[], idVideo: string }) {
    const [collapsable, setCollapsable] = useState<string>('');
    const { data:session } = useSession();
    const styleDisplay = {
        display: "block",
    }
    
    useEffect(()=>{

    },[collapsable]);

    return (
        <ul className="collapsable comments-collaps">
            <li className={collapsable}>
                <div 
                    className="collapsible-header" 
                    id="comments-header" 
                    tabIndex={0} 
                    onClick={() => {collapsable == '' ? setCollapsable('active'): setCollapsable('')}}
                >
                    <b style={{ fontSize: "1.15rem" }}>{listaComentarios.length} comments</b>&nbsp;
                    <i className="material-icons" id="comment-icon">expand_more</i>
                </div>
                <div className="collapsible-body" style={collapsable === 'active' ? styleDisplay : undefined}>
                    <TextAreaComment idVideo={idVideo}/>
                    <br />
                    <ul className="collection video-card-box">
                        {
                            listaComentarios.map((comment) => (
                                <li key={comment.id} className="collection-item avatar video-card-profile">
                                    <Image 
                                        src={ comment.user.image != null ?`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${comment.user.id}` : '/profile-image.jpg'} 
                                        alt="imagen usuario" 
                                        className="circle video-card-user" 
                                        width={42} 
                                        height={42}
                                    />
                                    <p>
                                        <b>{comment.user.username}</b>
                                        &nbsp;&nbsp;
                                        <span className="subtitle"> hace {difhora(comment.updateAt)} </span>
                                    </p>
                                        <FormEditComment comment={comment}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </li>
        </ul>
    );
}