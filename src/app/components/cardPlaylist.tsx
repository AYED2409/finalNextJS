import Image from "next/image";
import ButtonDeletePlaylist from "./buttonDeletePlaylist";

export default async function CardPlaylist({ idPlaylist, name, idUser }: { idPlaylist: string, name: string, idUser: string }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a 
                href={`/playlists/${idPlaylist}`} 
                className="mx-2"
            >
                <Image 
                    src="/playlist.jpg" 
                    width={300} 
                    height={200} 
                    alt="imagen de playlist" 
                    priority={true}
                />
            </a>
            <div className="p-2">
                <a 
                    href={`/playlists/${idPlaylist}`} 
                    className="mx-2"
                >
                    {name}
                </a>
                <a 
                    href={`/playlists/${idPlaylist}`} 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    View playlist  
                </a>
                <ButtonDeletePlaylist idPlaylist={idPlaylist} idUser={idUser}/>            
            </div>      
        </div>
    );
}