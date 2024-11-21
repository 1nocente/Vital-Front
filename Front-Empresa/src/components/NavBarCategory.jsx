'use client'

import Image from "next/image"
import Link from 'next/link';
import { usePathname } from 'next/navigation'



export default function NavBarCategory({ category, images, title }) {
    const actualPage = () => {
        
        let linkClass = 'flex items-center pt-20';
        const pathname = usePathname();
        if (pathname == category) {
            linkClass += ' text-blue-950';

          
        }
        return linkClass;
       
    };

    return (
        <Link href={category} className={actualPage() }>
            <Image src={images} alt={title}  className={`{$customImageClass} w-10 h-10`} />
            {/* Título estilizado */}
            <span className="text-xl  text-White hover:text-blue-950 ml-4">
                {title}
            </span>
        </Link>
    );
}



