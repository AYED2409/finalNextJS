"use client";

import { useSession } from "next-auth/react";
import { Category, Video } from "../lib/definitions";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Tag } from "../lib/definitions";
import { addOrDeleteTags, editVideo, initTagVideoEdit, updateThumbnailVideo } from "../lib/actions";
import Image from "next/image";

export default function FormEditVideo({ categories, video, tags }: { categories: [], video: Video, tags: [] }) {
    const { data: session } = useSession();
    const [title, setTitle] = useState<string>(video.title);
    const [category, setCategory] = useState<string>(video.category.name);
    const [description, setDescription] = useState(video.description);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [tagsState, setTagsState] = useState(initTagVideoEdit(tags, video));
    const [tagsStateInit, setTagsStateInit] = useState(initTagVideoEdit(tags, video));
    const [activeLabelTitle, setActiveLabelTitle] = useState('active');
    const [activeLabelDescription, setActiveLabelDescription] = useState('active');
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const [showTags, setShowTags] = useState<boolean>(false);
    const [valueTags, setValueTags] = useState([]); 
    const [thumbnail, setThumbnail] = useState<File | null>(null); 
    const styleVisibleSelect = {
        display: 'block',
        width: '100%',
        left: '0px',
        top: '0px',
        height: 'max-height',
        transformOrigin: '0px 0px ',
        opacity: '1',
        transform: 'scaleX(1) scaleX(1) scaleY(1)'
    }

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);
        setMessage(undefined);
        const form = new FormData();
        if (title !== video.title) {
           form.append('title', title)
        }
        if (category !== video.category.name) {
            form.append('category', category);
        }
        if (file !== null) {
            form.append('file', file);
        }
        if (description != video.description) {
            form.append('description', description);
        } 
        submitForm(form);
    }

    const submitForm = async (formData: FormData) => {
        const res = await editVideo(formData, video.id, session?.user.token);
        const data = await res.json();
        if (data.affected > 0) {
            setMessage('Changes saved successfully');
            if(thumbnail) {
                const formThumbnail = new FormData();
                formThumbnail.append('thumbnail', thumbnail);
                const resThumbnail = await updateThumbnailVideo(session?.user.token, video.id, formThumbnail);
                if(resThumbnail.statusCode == 400) {
                    setError(`the thumbnain was not uploaded ${resThumbnail.message}`)
                }
            }
        }
        if (data.error) {
            setError(data.message);
            return;
        }
        addOrDeleteTags(tagsStateInit, tagsState, session?.user.token, video);
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
                                        <span className="card-title center-align"><b>Edit Video</b></span>
                                        <br/>
                                        {
                                            message && (
                                                <div className="card green lighten-1" key={message}>
                                                    <div className="card-content white-text">
                                                        <p>{message}</p>
                                                    </div>
                                                </div>  
                                            )
                                        }
                                        {
                                            error && (
                                                <div className="card red darken-1" key={error}>
                                                    <div className="card-content white-text">
                                                        <p>{error}</p>
                                                    </div>
                                                </div>
                                                                        )
                                        }
                                        <div className="row ">
                                            <div className="col s12 m6 l6">
                                                    <form 
                                                        onSubmit={handlerSubmit}
                                                        id="videoForm" 
                                                        encType="multipart/form-data" 
                                                    >
                                                    <div className="input-field create-input">
                                                        <input 
                                                            id="title" 
                                                            type="text" 
                                                            defaultValue={video.title} 
                                                            className="validate" 
                                                            onChange={(event) => setTitle(event.target.value)} 
                                                            onFocus={() => setActiveLabelTitle('active')} 
                                                            onBlur={() => { 
                                                                if (title =='' ) { 
                                                                    setActiveLabelTitle('')
                                                                }
                                                            }}
                                                        />
                                                        <label 
                                                            htmlFor="title" 
                                                            className={activeLabelTitle} 
                                                            onClick={() => activeLabelTitle == '' && title != '' ? setActiveLabelTitle('') : setActiveLabelTitle('active')}
                                                        >
                                                            Title
                                                        </label>
                                                    </div>

                                                    <div className="input-field create-input">
                                                        <input 
                                                            id="description" 
                                                            type="text" 
                                                            className="validate" 
                                                            defaultValue={description}
                                                            onChange={(event) => setDescription(event.target.value)} 
                                                            onFocus={() => setActiveLabelDescription('active')} 
                                                            onBlur={() => { 
                                                                if (description =='' ) { 
                                                                    setActiveLabelDescription('')
                                                                }
                                                            }}
                                                        />
                                                        <label 
                                                            htmlFor="description" 
                                                            className={activeLabelDescription} 
                                                            onClick={() => activeLabelDescription == '' && description != '' ? setActiveLabelDescription('') : setActiveLabelDescription('active')}
                                                        >
                                                            Description
                                                        </label>
                                                    </div>
                                                    <div 
                                                        className="input-field create-input" 
                                                        onClick={() => showSelect ? setShowSelect(false) : setShowSelect(true)}
                                                    >
                                                        <div className="select-wrapper">
                                                            <input 
                                                                type="text" 
                                                                className="select-dropdown dropdown-trigger" 
                                                                readOnly={true} 
                                                                data-target="select-options-7c6d8906-c48b-7324-8ed3-cdef4f6ff4ec"
                                                                defaultValue={category}
                                                            />
                                                            
                                                            <ul 
                                                                className="dropdown-content select-dropdown" 
                                                                tabIndex={0} 
                                                                style={showSelect ? styleVisibleSelect: undefined}
                                                            >
                                                                <li
                                                                    className="disabled selected"
                                                                    id="select-options-7c6d8906-c48b-7324-8ed3-cdef4f6ff4ec0"
                                                                    tabIndex={0}
                                                                >
                                                                    <span>Choose your option</span>
                                                                </li>
                                                                {
                                                                    categories.map((category: Category) => (                    
                                                                        <li 
                                                                            id={category.id}
                                                                            key={category.id} 
                                                                            tabIndex={0} 
                                                                            onClick={(event) => setCategory(`${category.name}`)}
                                                                        >
                                                                            <span>{category.name}</span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7 10l5 5 5-5z" />
                                                                <path d="M0 0h24v24H0z" fill="none" />
                                                            </svg>
                                                        </div>
                                                        <label>Category</label>
                                                    </div>
                                                    <div className="input-field create-input" >
                                                        <div className="select-wrapper">
                                                            <input 
                                                                value={valueTags.join(' - ')}
                                                                className="select-dropdown dropdown-trigger" 
                                                                readOnly type="text" 
                                                                data-target="select-options-87bbb278-bf07-aacd-aff2-0bccab058377" 
                                                                onClick={() => {showTags ? setShowTags(false) : setShowTags(true);}}
                                                            />
                                                            <ul 
                                                                className="dropdown-content select-dropdown multiple-select-dropdown" 
                                                                style={showTags ? styleVisibleSelect : undefined} 
                                                                onClick={() => {showTags ? setShowTags(false) : setShowTags(true);}}
                                                            >
                                                                <li className="disabled">
                                                                <span>
                                                                    <label>
                                                                        <input  type="checkbox" disabled/>
                                                                        <span>Choose your options</span>
                                                                    </label>
                                                                </span>
                                                                </li>
                                                                {           
                                                                    tags.map((tag: Tag) => (
                                                                        <li key={tag.id}>
                                                                            <span>
                                                                                <label>
                                                                                    <input 
                                                                                        id={tag.id} 
                                                                                        type="checkbox" 
                                                                                        defaultChecked={tag.checked} 
                                                                                        onChange={(e) => {
                                                                                            const index = tagsState.findIndex((tag: Tag) => tag.id == e.target.id)
                                                                                            let newState = [...tagsState];
                                                                                            newState[index] = {...tag, checked : e.target.checked}
                                                                                            setTagsState(newState);
                                                                                        }}
                                                                                    />
                                                                                    <span>{tag.name}</span>
                                                                                </label>
                                                                            </span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7 10l5 5 5-5z" />
                                                                <path d="M0 0h24v24H0z" fill="none" />
                                                            </svg>
                                                        </div>
                                                        <label>Select your tags</label>
                                                    </div>
                                                
                                                    <div className="file-field input-field">
                                                        <div className="btn color-button">
                                                            <span>File</span>
                                                            <input 
                                                                id="file" 
                                                                name="file"
                                                                type="file" 
                                                                accept="video/*" 
                                                                onChange={(event)=> {
                                                                    const selectFile = event.target.files?.[0];
                                                                    if (selectFile) {
                                                                        setFile(selectFile);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input 
                                                                className="file-path validate"  
                                                                type="text" 
                                                                defaultValue={file?.name}
                                                            />
                                                        </div>  
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col s12">
                                                            <button 
                                                                type="submit" 
                                                                className="waves-effect waves-light btn color-button" 
                                                                style={{width: '100%'}}
                                                            >  
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        
                                            <div className="col s12 m6 l6">
                                                <div className="file-field input-field">
                                                    <div className="btn color-button">
                                                        <span>Upload file</span>
                                                        <input accept="image/*" type="file" onChange={(event)=> {
                                                                    const selectFile = event.target.files?.[0];
                                                                    if (selectFile) {
                                                                        setThumbnail(selectFile);
                                                                    }
                                                                }}/>
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" placeholder="Thumbnail" type="text" defaultValue={thumbnail?.name}/>
                                                    </div>
                                                </div>
                                                {
                                                    video.thumbnail && thumbnail ? (
                                                        <div className="previewImage" style={{backgroundImage: `url(${URL.createObjectURL(thumbnail)})`}}></div>    
                                                    ) : !video.thumbnail && thumbnail ? (
                                                        <div className="previewImage" style={{backgroundImage: `url(${URL.createObjectURL(thumbnail)})`}}></div>    
                                                    ) : video.thumbnail ? (
                                                        <Image 
                                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/thumbnail/${video.id}`} 
                                                            alt="" 
                                                            className="circle video-card-user" 
                                                            width={200} 
                                                            height={200}
                                                        />
                                                    ) : (
                                                        <div className="previewImage"></div>
                                                    )
                                                    
                                                    // )
                                                }
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link 
                                    href={`/user/${session?.user.id}`} 
                                    className="back-button"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col s0"></div>
                </div>
            </div>
        </div>
    );
}