'use client';

import Image from "next/image";
import { getSearch } from "../lib/actions";
import { Video, VideoTag } from "../lib/definitions";
import { useEffect, useState } from "react";
import Link from "next/link";

export function ResultSearch({ query }: { query?: string; }) {
    const [queryResults, setQueryResults] = useState([]);
    const [activeModal, setActiveModal] = useState<boolean>(true);
    const styleShow ={display: 'block', opacity: 1, top: '80px', zIndex: 1003}
    
    useEffect(() => {
        const getData = async () => {
            try {
                if (query) {
                    const res = await getSearch(query);
                    setQueryResults(res);
                    setActiveModal(true)
                } else {
                    setQueryResults([]);
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        getData();
    }, [query]);
    
    if(query) {
        return (
            <>
                <div 
                    id="modalSearch" 
                    className="modal modal-fixed-footer open" 
                    tabIndex={0} 
                    style={ activeModal ? styleShow : undefined}
                >
                    <div className="modal-content">
                        <h4 className="center-align">Videos Found</h4>
                        <div>
                            <ul className="collection">
                                {   
                                    queryResults.length > 0 && (
                                        queryResults?.map((video: Video) => (
                                            <li key={video.id} className="collection-item avatar">
                                                <Image 
                                                    src={video.user.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/imageUser/${video.user.id}` : '/profile-image.jpg'} 
                                                    alt="" 
                                                    className="circle" 
                                                    width={300}  
                                                    height={300}
                                                />
                                                <span className="title"><b >Title: </b>{video.title}</span>
                                                <br />
                                                <br/>
                                                <span><b>Category:</b>{video.category.name}</span>
                                                <br />
                                                <br/>
                                                <span>
                                                    <div className="row">
                                                        {
                                                            video.videoTags.map((videoTag: VideoTag) => (
                                                                <div className="flex" key={videoTag.id}>
                                                                    <div className="col chip index-tag">{videoTag.tag.name}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </span>
                                                <p></p>
                                                <Link href={`/videos/${video.id}`} className="secondary-content" >
                                                    <i className="material-icons">ondemand_video</i>
                                                </Link>
                                            </li>              
                                        ))
                                    ) 
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div 
                            className="modal-close waves-effect waves-green btn-flat" 
                            onClick={() => setActiveModal(false)}
                        >
                            <i className="material-icons right">clear</i>
                            Close
                        </div>
                    </div>
                </div>
            </>
        )    
    }
}