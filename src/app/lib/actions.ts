import { unstable_noStore } from "next/cache";
import { Tag, Video } from "./definitions";

//obtiene la lista de videos
export async function getVideos(page: string, limit: string) {
    unstable_noStore();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos?page=${page}&limit=${limit}`);
        const data = await res.json();
        
        return data;      
    } catch (error) {
        return { message: 'Error al obtener los videos' };
    }
}

//obtiene el valor buscado en search
export async function getSearch(query: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/search/${query}`);
    const data = await res.json();
    return data;
}

//obtiene el video indicando su id
export async function getVideoWithId(id: string) {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${id}`)
    const data = await res.json();
    return data;    
}

//realiza el login
export async function login(email:string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    return data;
}

//obtiene la lista de videos de un usuario
export async function getMyVideos(idUser: string) {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/user/${idUser}`);
    const data = await res.json();
    return await data;
}

//obtener la fecha de un tipo date
export const getDate = (dateTime: string) => {
    const [date, time] = dateTime.split('T');
    return date; 
}

//obtiene la lista de categorias
export const getCategories = async () => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
    const data = await res.json();
    return await data;
}

//elimina un video
export const deleteVideo = async (id: string, token: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return await res.json();
}

//crea una categoria
export const createCategory = async (name: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name }),
    })
    const data = await res.json();
    return data;
}

//crea un tag
export const createTag = async (name: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    })
    const data = await res.json();
    return data;
}

//obtiene la lista de tags
export const getTags = async () => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
    const data = await res.json();
    return data;
}

//asignar una lista de tags a un video, (video-tag)
export const setTags = async (tagList: Tag[], token: string, idVideo: string) => {
    const messages = [];
    for (const tag of tagList) {
        const res = await setVideoTag(token, { idVideo, idTag: tag.id });
        if (res.error) {
            messages.push(`${res.message}, etiqueta: ${tag.name}`);
        }
    }
    return messages;
}

//asigna un tag a un video (crear video-tag)
const setVideoTag = async (token: string, body: object) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos-tags`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    return data;
}

//eliminar un tag a un video
const removeVideoTag = async (token: string, idVideoTag: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos-tags/${idVideoTag}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = await res.json();
    return data;
}

// inicia el estado (checked) de los tags que tiene un video
export const initTagVideoEdit = (tagList: Tag[], video: Video) => {
    tagList.forEach((tag: Tag, i) => {
        const idexVideoTagActive = video.videoTags.findIndex((vd) => vd.tag.id == tag.id)
        if (idexVideoTagActive != -1 ) {
            tagList[i].checked = true;
        } else {
            tagList[i].checked = false;
        }
    })
    return tagList;
}

export const addOrDeleteTags = (stateInitTags: Tag[], newStateTags: Tag[], token: string, video:Video) => {
    newStateTags.forEach((tag: Tag, index) => {
        if (tag.checked != stateInitTags[index].checked) {
            // console.log("asignar el valor: ", tag.checked, tag);
            if (tag.checked) {
                const body = { idVideo: video.id, idTag: tag.id }
                setVideoTag(token, body);
            } else {
                const videoTag = video.videoTags.find((videotag) => videotag.tag.id == tag.id)
                removeVideoTag(token, videoTag.id);
            }
        }
    })
}

//suscribirse a un usuario
export const subscribeto = async(token: string, idSubscribedTo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({idSubscribedTo})
    })
    const data = await res.json();
    return data;
}

//cancelar suscripcion
export const desSubscription = async(token: string, idSubscribedTo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/unsubscribe/${idSubscribedTo}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await res.json();
    return data;
}

//obtener los suscriptores de un usuario
export const getSubscribers = async(idUser: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/user/${idUser}/subscribers`);
    const data = await res.json();
    return data;
}

//obtener los comentarios de un video
export const getCommentsFromVideo = async(idVideo: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/video/${idVideo}`);
    const data = await res.json();
    return data;
} 

//añadir comentario 
export const addComment = async(token: string, body: object) => {
    // console.log(body)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}

//editar comentario
export const editComment = async(token: string, idComment: string, body: object) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${idComment}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}

//eliminar comentario
export const deleteComment = async(token: string, idComment: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${idComment}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`    
        }
    })
    const data = await res.json();
    return data;
}

//dar like
export const doLike = async(token: string, idVideo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`    
        },
        body: JSON.stringify({idVideo: idVideo})
    })
    const data = await res.json();
    return data;
}

//quitar like
export const desLike = async(token: string, idLike: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/${idLike}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`        
        }
    })
    const data = await res.json();
    return data;
}

//obtener likes
export const getLikes = async() => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/`);
    const data = await res.json();
    return data;
}

//crear playlis
export const createPlaylist = async(token: string, body: object) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`       
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}

//elimiar playlist
export const deletePlaylist = async(token: string, idPlaylist: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/${idPlaylist}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`    
        }
    })
    const data = await res.json();
    return data;
}

//obtener playlist de un usuario
export const getMyPlaylists = async(idUser: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/user/${idUser}`);
    const data = await res.json();
    return data;
}

//obtener los videos de una playlist
export const getPlaylistVideos = async (idPlaylist: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists-videos/videos/playlist/${idPlaylist}`);
    const data = await res.json();
    return data;
}

//agregar video a la playlist
export const addVideoToPlaylist = async (token: string, body: object) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists-videos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}

//elimiar video de playlist
export const deleteVideoToPlaylist = async (token: string, idPlayListVideo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists-videos/${idPlayListVideo}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`    
        }
    })
    const data = await res.json();
    return data;
}

//obtener videos de un usuario
export const getVideoUser = async (idUser: string, limit: string, orderBy: string, order: string, page: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/user/${idUser}?limit=${limit}&order=${order}&orderBy=${orderBy}&page=${page}`);
    const data = await res.json();
    return data;
}

//obtener el numero de suscriptores de un usuario
export const getNumberSubscribersUser = async (idUser: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/user/${idUser}/subscribers`)
    const data = await res.json();
    return data.length;
}

//obtener el total de videos
export const getTotalVideos = async () => {
    const videos = await getVideos(`1`, `10000`);
    const total = videos.length;
    return total;
}

//obtener el total de videos de un usuario
export const getTotalVideosUser = async (idUser: string) => {
    const videosUser = await getVideoUser(idUser, '10000', 'date', 'DESC', '1');
    const total = videosUser.length;
    return total;
}

//obtener hace cuanto se subio un video min/horas/dias
export const difhora = (hVideo) => {
    const horaActual = new Date();
    horaActual.setHours(horaActual.getHours() - 2)
    var hProp = new Date(hVideo);
    var difMilisegundos =  horaActual - hProp;
    var dias = Math.floor(difMilisegundos / (1000 * 60 * 60 * 24));
    var horas = Math.floor((difMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 *60));
    var min = Math.floor((difMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    
    if (dias !== 0) {
        return `${dias} dias`;
    } else if (horas !== 0) {
        return `${horas} horas`
    } else {
        return `${min} minutos`
    }
}

//obtener datos de un usuario 
export const getUser = async (id: string) => {
    unstable_noStore();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`);
    const data = await res.json();
    return data;
}

//actualizar usuario
export const updateUser = async (idUser: string, token: string, body: object) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${idUser}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}

//actualizar imagen de usuario
export const updateUserImage = async (token: string, formData: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/image`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
    const data = await res.json();
    return data;
}

export const createVideo = async (formData: FormData, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
    // console.log(res.json())
    return res;
}

export const editVideo = async (formData: FormData, idVideo: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${idVideo}/`,{
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    })
    return res;
}

export const registerUser = async (username: string, email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    return res;
}

export const updateThumbnailVideo = async (token: string, idVideo: string, formData: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/thumbnail/${idVideo}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
    const data = await res.json();
    return data;
}