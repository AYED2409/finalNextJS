"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonFloat() {
    const { data: session, status } = useSession();
    const [active, setActive] = useState<boolean>(false);

    const styleActiveBtn = {
        opacity: '1',
        transform: 'scale(1) translateY(0px) translateX(0px)',
    }

    if (session?.user) {
        return (
            <div className={active ? 'fixed-action-btn active' : 'fixed-action-btn'}>
                    <a 
                        className="btn-floating btn-large color-button" 
                        onClick={() => {active ? setActive(false) : setActive(true)}}
                    >
                        <i className="large material-icons">menu</i>
                    </a>
                    <ul>
                        <li>
                            <Link 
                                href="/videos/create" 
                                className="btn-floating color-button tooltipped" 
                                data-position="left" 
                                data-tooltip="Add new Video" 
                                style={active ? styleActiveBtn : undefined}
                            >
                                <i className="material-icons">add</i>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={`/user/${session.user.id}/edit`} 
                                className="btn-floating color-button tooltipped" 
                                data-position="left" 
                                data-tooltip="Config user" 
                                style={active ? styleActiveBtn : undefined}
                            >
                                <i className="material-icons">settings</i>
                            </Link>
                        </li>
                        <li>
                            <a 
                                className="btn-floating red darken-1 tooltipped" 
                                data-position="left" 
                                data-tooltip="Log out" 
                                style={active ? styleActiveBtn : undefined} 
                                onClick = {() => signOut()}
                            >
                                <i className="material-icons">exit_to_app</i>
                            </a>
                        </li>
                    </ul>
                </div>
        );    
    }
}