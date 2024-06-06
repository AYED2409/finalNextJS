"use client"

import { useEffect, useState } from "react";

export default function Incremental({ endNumber, duration, title }: { endNumber: number, duration: number, title: string }) {
    const [number, setNumber] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = endNumber;
        const increment = end / (duration / 10);
    
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(timer);
            setNumber(end);
          } else {
            setNumber(Math.ceil(start));
          }
        }, 10);
    
        return () => clearInterval(timer);
      }, [endNumber, duration]);

    return (
        <div className="col s12 m4 center-align">
            <h2 className="value">{number}</h2>
            <p>{title}</p>
        </div>
    );
    
}