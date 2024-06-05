"use client";

import { useRef, useState } from "react";
import { addComment } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TextAreaComment({ idVideo }: { idVideo: string}) {
    const { data: session } = useSession();
    const [text, setText] = useState<string | undefined>(undefined);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
        setMessage(undefined);
        const body = { idVideo: `${idVideo}`, text: text };
        if (session?.user == undefined) {
            setErrors(["You must log in to comment"]);
            return;
        }
        const res = await addComment(session?.user.token, body);
        if ( res.error) {
            setErrors(res.message);
            return;
        }
        setMessage(`Comment added successfully`);
        formRef.current?.reset();
        setText(undefined);
        router.refresh();
    }

    return (
        <form onSubmit={handlerSubmit} ref={formRef}>
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
                message && (
                    <div className="card green lighten-2" key={message}>
                        <div className="card-content white-text">
                            <p>{message}</p>
                        </div>
                    </div>
                )
            }
            <div className="input-field">
                <textarea 
                    id="textarea1" 
                    className="materialize-textarea" 
                    style={{ height: "45px" }} 
                    onChange={(event) => setText(event.target.value)}
                />  
                <label htmlFor="textarea1" className="active">
                &quot;Add a comment.... &quot;
                </label>
                <button 
                    className="waves-effect waves-light btn color-button" 
                    type="submit" 
                    name="action"
                >
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    );
}