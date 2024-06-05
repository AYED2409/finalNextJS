"use client";

import { useEffect, useState } from "react";
import { Comment } from "../lib/definitions";
import { deleteComment, editComment } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormEditComment({ comment }: { comment: Comment }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [text, setText] = useState(comment.text);
    
	useEffect(() => {
    },[comment.text])

    const handlerSubmit = async(event: React.FormEvent<HTMLElement>) => {
       event.preventDefault();
		if(session?.user.token) {
			const res = await editComment(session?.user.token, comment.id, {text});
		}
       
    //    router.refresh();
    }

    const handlerDelete = async() => {
		if(session?.user.token) {
			const res = await deleteComment(session?.user.token, comment.id);
        	router.refresh();
		}
        
    }
    return (
        <div className="row">
    		<form className="col s12" onSubmit={handlerSubmit}>
      			<div className="row">
        			<div className="input-field col s12">
						{
							(comment.user.id == session?.user.id  || session?.user.role == 'administrator') && (
								<i className="material-icons prefix">mode_edit</i>
							)
						}
          				<textarea 
							id="icon_prefix2" 
							disabled={(session?.user.role != 'administrator' && comment.user.id != session?.user.id) ? true : false} 
							className="materialize-textarea" 
							defaultValue={comment.text} 
							onChange={(event) => setText(event.target.value)}
						>	
						</textarea>
          				<label htmlFor="icon_prefix2" className="active">Comment</label>
          				{
							(comment.user.id == session?.user.id || session?.user.role == 'administrator') &&  (
								<>
									<div className="col">
										<button 
											type="submit" 
											className="waves-effect waves-light btn color-button"
										>
											<i className="material-icons right ">border_color</i>
											Edit
										</button>  
									</div>
									<div className="col">
										<button 
											type="button" 
											className="btn waves-effect waves-light red lighten-1" 
											onClick={() => handlerDelete()}
										>
											<i className="material-icons right ">delete</i>
											Delete
										</button>  
									</div>
								</>
							)
          				}
        			</div>
      			</div>
    		</form>
  		</div> 
    );
}