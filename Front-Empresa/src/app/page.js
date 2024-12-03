"use client"

import React from "react";

export default function Home() {
  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 min-h-screen flex flex-col items-center justify-center">
        <div className="flex absolute top-3 left-10 m-4">
          <img src="./img/logo.png" alt="Logo" className="w-42" />
          <h2 className="font-sans text-7xl text-white mt-10">Vital+</h2>
        </div>

        <div className="absolute left-[80px] top-[400px]">
          <h1 className="font-sans font-bold text-8xl text-white">
            Seja Bem-vindo ao VITAL+
          </h1>
          <h2 className="font-bold font-sans text-5xl text-white mt-5">
            Onde a saúde encontra inovação
          </h2>
        </div>

        <div className="absolute right-0 top-[244px]">
          <img src="./img/doutor-entrar.png" alt="medico" className="w-[700px]" />
        </div>

        <div className="absolute left-[400px] top-[900px]">
          <button
            className="bg-blue-400 text-white rounded-full w-[450px] h-16 text-4xl"
            onClick={handleClick}
          >
            COMECE POR AQUI
          </button>
        </div>
      </div>
    </>
  );
}
