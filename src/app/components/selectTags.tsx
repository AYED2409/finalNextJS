import { Tag } from "../lib/definitions";

export default function SelectTags({ tags }: { tags: []  }) {
    return (
        <div className="max-w-sm mx-auto">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                    tags.map((tag: Tag) => (
                        <li key={tag.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input 
                                    id={tag.id} 
                                    type="checkbox" 
                                    value={tag.id} 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label 
                                    htmlFor={tag.id} 
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {tag.name}
                                </label>
                            </div>
                        </li>    
                    ))
                }
            </ul>    
        </div>
    );
}