"use client";

import { useState } from "react";

export default function InputText({name }: { name: string }) {
    const [value, setValue] = useState('');
    const [activeLabel,setActiveLabel] = useState('');

    return (
        <div className="input-field create-input">
            <input 
                id={name} 
                value={value} 
                type="text" 
                className="validate" 
                onChange={(event) => setValue(event.target.value)} 
                onFocus={() => setActiveLabel('active')} 
                onBlur={() => { 
                    if (value =='' ) { 
                        setActiveLabel('')
                    }
                }}
            />
            <label 
                htmlFor={name} 
                className={activeLabel} 
                onClick={() => activeLabel == '' && value != '' ? setActiveLabel('') : setActiveLabel('active')}
            >
                {name}
            </label>
        </div>
    )
}