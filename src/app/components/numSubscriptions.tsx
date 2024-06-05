"use client";

import { useEffect, useState } from "react";
import { getSubscribers } from "../lib/actions";

export default function NumSubscriptions({ videoUserId } : { videoUserId: string }) {
    const [numSubscription, setNumSubscription] = useState<number>(0);
    useEffect(() => {
        const getData = async() => {
            const subscriptions = await getSubscribers(videoUserId);
            setNumSubscription(subscriptions.length)
        }
        getData();
    },[numSubscription]);
    return (
        <span className="subtitle">{numSubscription > 1 ? `${numSubscription} Subscriptions`: `${numSubscription} Subscription`}</span>
    );
}