"use client";

import { useEffect, useState } from "react";
import { addVideoToPlaylist, getMyPlaylists } from "../lib/actions";
import { useSession } from "next-auth/react";
import { Playlist } from "../lib/definitions";
import Link from "next/link";

export default function SelectPlaylist( { idVideo }: { idVideo: string }) {
    
    const [data, setData] = useState([]);
    const {data: session} = useSession();
    const [keySelection,setKeySelection] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [message, setMessage] = useState('');
    const [modalActive, setModalActive] = useState<boolean>(false);
    const styleActive = {
        display: 'block',
        opacity: '1',
        bottom: '0px',
        zIndex: '1003', 
    }
    const styleOverlay = {
        zIndex : '1002',
        display: 'block',
        opacity: '0.5'
    }

    useEffect(()=> {
        const getData = async () => {
            try {
                if (session?.user.id) {
                    const res = await getMyPlaylists(`${session?.user.id}`);
                    setData(res);
                    if (res.length > 0) {
                        setKeySelection(res[0].id || '');
                    } 
                }
            } catch (error) {
                console.log('error', error)
            }
        };
       getData();
    },[session?.user]);

    const handlerSubmit = async(event: React.FormEvent<HTMLElement>) => {
        if(session?.user.token) {
            event.preventDefault();
            setError(null);
            setMessage('');
            const res = await addVideoToPlaylist(session?.user.token, { idVideo, idPlaylist: keySelection })
            if (res.error) {
                setError("You must create a playlist");
            } else {
                setMessage('Playlist Added Successfully');
            }
        }
        
    }

    const handlerSelection = (event: React.FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectOption = event.currentTarget.selectedOptions[0];
        const key = selectOption.getAttribute('data-key');
        setKeySelection(`${key}`);
    }

    if (session?.user.id) {
        return(
            <div>
                <div 
                    className="single-chip index-tag single-video-subutton valign-wrapper " 
                    style={{ cursor: "pointer"}} 
                    onClick={() => setModalActive(true)}
                >
                    <i className="material-symbols-outlined"> playlist_add</i>&nbsp;Add to playlist
                </div>   
                <div id="modal1" className="modal bottom-sheet" tabIndex={0} style={modalActive ? styleActive : undefined}>
                    <div className="modal-content">
                        <h4>Add Video to Playlist</h4>
                        <Link href="/playlists/create" className="waves-effect waves-light btn color-button">
                            Create Playlist<i className="material-icons right">add</i>
                        </Link>
                        {
                            data.length > 0 && (
                                <div className="row single-user-info" style={styleActive}>
                                    <p>Select where you want to save it</p>
                                    {
                                        error && (
                                            <div className="card red darken-1" key={error}>
                                                <div className="card-content white-text">
                                                    <p>{error}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        message != '' && (
                                            <div className="card green lighten-1" key={message}>
                                                <div className="card-content white-text">
                                                    <p>{message}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <form onSubmit={handlerSubmit}>
                                            <select 
                                                id="playlists" 
                                                className=" col s12 m8 l8 select-wrapper" 
                                                style={styleActive} 
                                                defaultValue={keySelection}
                                                onChange={handlerSelection}
                                            >
                                            {
                                                data.map((playlist:Playlist) => (
                                                    <option 
                                                        key={playlist.id} 
                                                        data-key={playlist.id} 
                                                        value={playlist.id}
                                                    >
                                                        {playlist.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <div className="col"></div>
                                        <button 
                                            type="submit" 
                                            className="waves-effect waves-light btn color-button sm12 left" 
                                            style={{ marginTop: "0.3em"}}
                                        >
                                            Add to Playlist
                                        </button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                    <div className="modal-footer">
                        <a 
                            onClick={() => setModalActive(false)} 
                            href="#!" 
                            className="modal-close waves-effect waves-green btn-flat"
                        >
                            <i className="material-icons right">clear</i>
                            Close
                        </a>   
                    </div>   
                </div>
                {
                    modalActive && (
                        <div className="modal-overlay" style={styleOverlay}>
                        </div>
                    )
                }
            </div>
        );
    }
}