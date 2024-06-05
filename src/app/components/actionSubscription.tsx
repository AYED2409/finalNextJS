"use client";
import { useEffect, useState } from "react";
import { getSubscribers } from "../lib/actions";
import { Subscription, User } from "../lib/definitions";
import ButtonSubscription from "./buttonSubscription";

export default function ActionSubscription({ videoUser }: { videoUser: User}) {
    const idUser = videoUser.id;
    const [suscritors, setSuscriptors] = useState<Subscription[]>([]);
    
    useEffect(() => {
        const getData = async () => {
            const suscriptores = await getSubscribers(videoUser.id);  
            setSuscriptors(suscriptores);
            
        }
        getData();   
    },[])
   
    return (
        <ButtonSubscription user={videoUser} subscriberList={suscritors}/>
    );
}