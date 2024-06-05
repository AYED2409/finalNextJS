"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { subscribeto,getSubscribers,desSubscription } from "../lib/actions";
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";

export default function ButtonSubscription({ user, subscriberList }: { user: User, subscriberList: [] }) {
    const { data: session } = useSession();
    const [subscribers, setSubscribers] = useState(subscriberList);
    const [isSubscriber, setIsSubscriber] = useState(subscriberList.findIndex((subscription) => subscription.subscriber.id == session?.user.id))
    const router = useRouter();

    useEffect(()=> {
        const getData = async () => {
            let suscriptores = await getSubscribers(user.id);
            setSubscribers(suscriptores);
            setIsSubscriber(suscriptores.findIndex((sub) => sub.subscriber.id == session?.user.id))
        }
        getData();
    },[session])

    const handlerSubscription = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await subscribeto(session?.user.token,user.id)
        const subscriberList = await getSubscribers(`${user.id}`);
        setSubscribers(subscriberList)
        setIsSubscriber(subscriberList.findIndex((subscription) => subscription.subscriber.id == session?.user.id))
    }

    const handlerDesSubscription = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await desSubscription(session?.user.token,user.id)
        setIsSubscriber(-1)
    }

    if (session?.user) {
        if (isSubscriber < 0) {
            return (
                <form onSubmit={handlerSubscription}>
                    <button 
                        className="waves-effect waves-light btn color-button"  
                        type="submit" 
                        style={{ marginTop : "0.5rem" }}
                    >
                        Suscribirse
                    </button>
                </form>
            );
        } else {
            return (
                <form onSubmit={handlerDesSubscription}>
                    <button 
                        className="waves-effect red lighten-1 btn color-button" 
                        style={{ marginTop : "0.5rem" }}
                    >
                        Cancel Subscription
                    </button>
                </form>
            );    
        }
    }
}