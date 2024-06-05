"use client";

import { useState } from "react";
import { createCategory } from "../lib/actions";
import { useSession } from "next-auth/react";

export default function AddCategory() {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string[]>([])
    const [message, setMessage] = useState<string>('');
    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrors([]);
        setMessage('');
        event.preventDefault();
        if(session?.user.token){
            const res = await createCategory(name, session?.user.token);
            if (res.error) {
                setErrors(res.message)
            } else {
                setMessage(` ${res.name} Category created correctly`)
            }
        }
        
    }

    return (
        <>
            {
                errors.length > 0 && (
                    errors.map((error) => (
                        <div key={error} className="alert alert-danger mt-2">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">{error}</strong>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    </div>
                    ))
                )
            }
            {
                message.length > 0 && (
                    <div className="alert alert-succes mt-2">
                        <div className="bg-green-300 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">{message}</strong>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    </div>
                    
                )
            }
            <form onSubmit={handlerSubmit}>
                <div className="mb-5 mt-5 flex">
                    <input 
                        type="text" 
                        id="nuevaCategoria" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Inserta el nombre de la nueva Categoría"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <button type="submit" className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                </div>
            </form>
        </>
    );
}