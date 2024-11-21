'use client';

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBarCategory({ category, images, title, onClick }) {
    const actualPage = () => {
        let linkClass = 'flex items-center gap-4 font-bold font-poppins';
        const pathname = usePathname();
        if (pathname === category) {
            linkClass += ' text-white bg-[--fundodestaque] rounded-xl';
        }
        return linkClass;
    };

    return (
        <div onClick={onClick}> {/* Adicione onClick ao wrapper */}
            <Link 
                href={category} 
                className={actualPage()}
            >
                <Image src={images} 
                    className="w-10" 
                    alt={title} 
                />
                {title}
            </Link>
        </div>
    );
}
