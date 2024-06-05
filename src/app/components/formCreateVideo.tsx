"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Category, Tag } from "../lib/definitions";
import Link from "next/link";
import { createVideo, setTags, updateThumbnailVideo } from "../lib/actions";

export default function FormCreateVideo({ categories, tags }: { categories: [], tags: [] }) {
    const { data: session } = useSession();
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [tagsState, setTagsState] = useState<Tag[]>(tags);
    const [errorsTags, setErrorsTags] = useState<string[] | []>([]);
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const [showTags, setShowTags] = useState<boolean>(false);
    const [activeLabelTitle,setActiveLabelTitle] = useState('');
    const [activeLabelDescription,setActiveLabelDescription] = useState('');
    const [valueTags, setValueTags] = useState<string[]>([]);
	const [thumbnail, setThumbnail] = useState<File | null>(null); 
    const formRef = useRef<HTMLFormElement>(null);
    
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

    const handlerSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setErrorsTags([]);
        const form = new FormData();
        form.append('title', title);
        form.append('category', category);
        form.append('description', description);
        if (file !== null) {
            form.append('file', file);
        }
        submitForm(form);
    }

    const submitForm = async (formData: FormData) => {
		if(session?.user.token) {
			const res = await createVideo(formData, session?.user.token);
			const data = await res.json();
			if (!res.ok) {
				setError(data.message);
			}
			if(res.status == 201) {
				if(thumbnail != null) {
					const idVideo = data.id;
					const formThumbnail = new FormData();
					formThumbnail.append('thumbnail', thumbnail)
					const uploadThumbnail = await updateThumbnailVideo(session?.user.token, idVideo, formThumbnail)
					if(uploadThumbnail.statusCode == 400) {
						setError(`the thumbnain was not uploaded ${uploadThumbnail.message}`)
					}
				}
				setMessage("Video Subido exitosamente");
				setDescription("");
				setTitle("");
				setCategory("");
				setValueTags([]);
				setFile(null);
				setThumbnail(null)
				const tagList = tagsState.filter((tag: Tag) => tag.checked);
				const messagesErrorsTags = await setTags(tagList, session?.user.token, data.id);
				if (messagesErrorsTags.length > 0) {
					setErrorsTags(messagesErrorsTags)
					return;
				}
				formRef.current?.reset();
			}
		}
        
    }
    
    return (
        <div className="login-page">
        	<div className="container login-container valign-wrapper" style={{height: "100vh"}}>
          		<div className="row upload-container">
            		<div className="col s0"></div>
            		<div className="col s12">
              			<div className="card z-depth-3">
                			<div className="card-content">
                  				<div className="row">
                    				<div className="col s12">
										{
											error.length > 0 && (
												<div className="card red darken-1" key={error}>
													<div className="card-content white-text">
														<p>{error}</p>
													</div>
												</div>
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
										{
											errorsTags.length > 0 && (
												errorsTags.map((error) => (
													<div className="card red darken-1" key={error}>
														<div className="card-content white-text">
															<p>{error}</p>
														</div>
													</div>
												))
											)
										}
										<div className="row">
											<form ref={formRef} onSubmit={handlerSubmit} encType="multipart/form-data" id="videoForm" >
												<div className="col s12 m6 16">
												<div className="input-field create-input">
													<input id="title" type="text" className="validate" onChange={(event) => setTitle(event.target.value)} onFocus={() => setActiveLabelTitle('active')} onBlur={() => { if (title =='' ) { setActiveLabelTitle('')}}}/>
													<label htmlFor="title" className={activeLabelTitle} onClick={() => activeLabelTitle == '' && title != '' ? setActiveLabelTitle('') : setActiveLabelTitle('active')}>Title</label>
												</div>
												<div className="input-field create-input">
													<input id="description" type="text" className="validate"  value={description} onChange={(event) => setDescription(event.target.value)} onFocus={() => setActiveLabelDescription('active')} onBlur={() => { if (description =='' ) { setActiveLabelDescription('')}}}/>
													<label htmlFor="description" className={activeLabelDescription} onClick={() => activeLabelDescription == '' && description != '' ? setActiveLabelDescription('') : setActiveLabelDescription('active')}>Description</label>
												</div>
												<div className="input-field create-input" onClick={()=> showSelect ? setShowSelect(false) : setShowSelect(true)}>
													<div className="select-wrapper" >
														<input
															className="select-dropdown dropdown-trigger"
															type="text"
															readOnly={true}
															data-target="select-options-7c6d8906-c48b-7324-8ed3-cdef4f6ff4ec"
															value={category}
														/>
														<ul
															id="select-options-7c6d8906-c48b-7324-8ed3-cdef4f6ff4ec"
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
																	<li key={tag.id} >
																		<span>
																			<label>
																				<input  
																					id={tag.id} 
																					type="checkbox" 
																					onChange={(e) => {
																						const index = tagsState.findIndex((tag: Tag) => tag.id == e.target.id)

																						tagsState[index].checked = e.target.checked
																						setTagsState(tagsState);
																						const existTag = valueTags.findIndex((t) => t == tag.name);
																						var tags = valueTags;
																						if(existTag == -1) {
																							tags.push(tag.name);
																							setValueTags(tags)
																						} else {
																							tags.splice(existTag,1)
																						}
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
												<br />                   
												<div className="file-field input-field">
													<div className="btn color-button">
														<span>File</span>
														<input 
															type="file" 
															accept="video/*" 
															onChange={(event) => {
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
															placeholder="Video File" 
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
															style={{width: "100%"}}
														>
															Upload
														</button>
													</div>
												</div>	
												</div>
												<div className="col s12 m6 16">
													
													<div className="row">
														<div className="col 2"></div>
														
															<div className="file-field input-field">
																<div className="btn color-button">
																	<span>Upload file</span>
																	<input accept="image/*" type="file" 
																		onChange={(event) => {
																			const selectFile = event.target.files?.[0];
																			if (selectFile) {
																				setThumbnail(selectFile);
																			}
																		}}
																	/>
																</div>
																<div className="file-path-wrapper">
																	<input className="file-path validate" type="text" placeholder="Thumbnail" defaultValue={thumbnail?.name}/>
																</div>
															</div>	
														
														{
															thumbnail ? <div className="previewImageUpload" style={{backgroundImage: `url(${URL.createObjectURL(thumbnail)})`}}></div>
															:	<div className="previewImageUpload"></div>
														}
														
													</div>
													<div className="row">
														<div className="col 4">
															<Link href={"/tags/create"} className="waves-effect waves-light btn color-button" style={{ marginTop: "1.5rem" }}>
																Create new tag
															</Link>
																	
														</div>
														<div className="col 2"></div>
														<div className="col4">
															<Link href={"/categories/create"} className="waves-effect waves-light btn color-button" style={{ marginTop: "1.5rem" }}>
																Create new category
															</Link>
														</div>		
													</div>		
												</div>
											</form>
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