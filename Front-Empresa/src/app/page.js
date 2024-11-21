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
          <img src="./img/logo.png" alt="Logo" className="w-30" />
          <h2 className="font-sans text-5xl text-white mt-10">Vital+</h2>
        </div>

        <div className="absolute left-[80px] top-[300px]">
          <h1 className="font-sans font-bold text-7xl text-white">
            Seja Bem-vindo ao VITAL+
          </h1>
          <h2 className="font-bold font-sans text-5xl text-white mt-5">
            Onde a saúde encontra inovação
          </h2>
        </div>

        <div className="absolute right-0 top-[297px]">
          <img src="./img/doutor-entrar.png" alt="medico" className="" />
        </div>

        <div className="absolute left-[300px] top-[700px]">
          <button
            className="bg-blue-400 text-white rounded-full w-80 h-14 text-2xl"
            onClick={handleClick}
          >
            COMECE POR AQUI
          </button>
        </div>
      </div>
    </>
  );
}
