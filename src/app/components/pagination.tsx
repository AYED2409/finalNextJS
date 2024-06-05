"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pagination({ page, limit, total }: { page: number | string, limit: number | string, total: number | string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(Math.ceil(total / limit));
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const  params = new URLSearchParams(searchParams);
    const pageNumber = Array.from({length: totalPage}, (_, index) => index + 1);
    
    useEffect(() => {
        const getData = async () => {
            setTotalPage(Math.ceil(total / limit));
        }
        getData();
    },[limit, page]);

    const handlePage = (page: number, action: string) => {
        if (page >= 2 && action == "prev") {
            setCurrentPage(currentPage - 1);
            params.set('page', `${currentPage-1}`)
            replace(`${pathName}?${params.toString()}`);
        } else if (page < totalPage && action == "next") {
            setCurrentPage(currentPage + 1);
            params.set('page', `${currentPage+1}`)
            replace(`${pathName}?${params.toString()}`);
        } else {
            setCurrentPage(page);
            params.set('page', `${page}`)
            replace(`${pathName}?${params.toString()}`);
        }
    }

    return (
        <>    
            <ul className="pagination center-align">
                <li className={currentPage == 1 ? 'disabled' : 'waves-effect'}>
                    <a 
                        href="#!" 
                        onClick={() => {handlePage(currentPage, "prev");}}
                    >
                        <i className="material-icons">chevron_left</i>
                    </a>
                </li>
                {
                    pageNumber.map((page) => (
                        <li key={`${page}`} className={page == currentPage ? "active" : "waves-effect"}>
                            <a 
                                href="#!"  
                                onClick={() => {
                                    console.log(`page ${page}`);
                                    handlePage(page,'direct');
                                }}
                            >
                                {`${page}`}
                            </a>
                        </li>    
                    ))
                }
                <li className={currentPage == totalPage ? 'disabled' : 'waves-effect'}>
                    <a 
                        href="#!" 
                        onClick={() => { 
                            handlePage(currentPage, "next")        
                        }}
                    >
                        <i className="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        </>
    );
}
