import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from 'react';

const links =[
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Journal' },
    { href: '/history', label: 'History' },
]

const dashboardLayout = ({ children }) => {
    return(
        <div className="h-screen w-screen bg-slate-900 text-white">
            <aside className="absolute w-[200px] top-0 left-0 h-screen border-r border-black/20 py-6 pl-12 overflow-y-auto">
                <div className="pb-6 text-3xl">
                    Mood
                </div>
                <ul>
                    {links.map(link => (
                        <li key={link.href} className="py-2 hover:scale-105 transition duration-300 ease-in-out">
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
                <div className="h-[calc(100vh-60px)] overflow-auto">{children}</div>
            </div>
        </div>
    )
}

export default dashboardLayout