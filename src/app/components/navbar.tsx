'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLinks } from "../lib/links";
import Search from "./search";
import ButtonLoginLogout from "./buttonLoginLogout";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const {data: session} = useSession();
    const links = getLinks();
    const pathName = usePathname()
    const styleImage = {
        width: '42px',
        cursor: 'pointer',
        marginTop: '8px',
    };

    return (
        <div className="navbar-fixed">
            <nav className="white main-navbar" role="navigation"> 
                <div className="nav-wrapper container" id="navbar-icons" style={{ display: "block" }}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Vidi Logo" className="brand-logo" id="logo" width={42} height={47} style={styleImage} />
                    </Link>
                    <ul className="right">
                        <Search placeholder="search"/>
                        <li style={{ height: "64px" }} className="custom-black-text user-index-background" >
                            <ButtonLoginLogout />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}