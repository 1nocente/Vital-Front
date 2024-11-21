// src/components/Header.jsx
import React from "react";
import Image from "next/image";

export default function Header({ nome, imagem }) {
    return (
        <header className="p-4 text-white shadow-md flex items-center" style={{ backgroundColor: '#007acc' }}>
            <div className="mr-4">
                <Image 
                    src={imagem} 
                    alt={`Foto de ${nome}`} 
                    width={50} 
                    height={50} 
                    className="rounded-full" 
                />
            </div>
            <h1 className="text-xl font-bold">{nome}</h1>
        </header>
    );
}
