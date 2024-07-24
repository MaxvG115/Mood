import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from 'react';

const links =[
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Journal' }
]

const dashboardLayout = ({ children }) => {
    return(
        <div className="h-screen w-screen relative">
            <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/20 py-6 pl-4">
                <div className="pb-6">
                    Mood
                </div>
                <ul>
                    {links.map(link => (
                        <li key={link.href} className="py-2">
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="ml-[200px] h-full">
                <header className="h-[60px] border-b border-black/20">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    )
}

export default dashboardLayout