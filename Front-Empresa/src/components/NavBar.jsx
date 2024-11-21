"use client";

import React, { useEffect, useState } from 'react';
import "../styles/globals.css";
import NavBarCategory from './NavBarCategory';

// Import das Imagens
import infoImg from "../../public/img/empresa.png";
import inicioImg from "../../public/img/inicio.png";
import consultaImg from "../../public/img/consultas.png";
import doutorImg from "../../public/img/medicos.png";
import notificacoesImg from "../../public/img/notificacoes.png";

const NavBar = () => {
  const [empresa, setEmpresa] = useState("");
  const [idEmpresa, setIdEmpresa] = useState(null);

  useEffect(() => {
    // Carrega os dados do localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setEmpresa(userData.empresa); // Nome da empresa
      setIdEmpresa(userData.id); // ID da empresa
    }
  }, []);

  return (
    <div className="bg-[--navdestaque] text-white w-72 min-h-screen flex flex-col py-6 px-5">
      {/* Logo Vital+ */}
      <div className="top-0 flex ">
        <img className="h-[100px]" src="/img/logo.png" alt="Logo" />
        <h1 className="text-3xl mt-10">Vital+</h1>
      </div>

      <ul className="mt-[1px] pt-20 " id="categoria">
        {/* Links da NavBar */}
        <NavBarCategory category={"/info-clinica"} images={infoImg} title={empresa || "Nome da Cliníca"} customImageClass="w-16 h-16"/>
        <NavBarCategory category={"/inicio"} images={inicioImg} title={"Ínicio"} />
        <NavBarCategory category={"/consultas"} images={consultaImg} title={"Consultas"} />
        <NavBarCategory category={"/doutores"} images={doutorImg} title={"Doutores"} />
        <NavBarCategory category={"/notificacoes"} images={notificacoesImg} title={"Notificações"} />
      </ul>
    </div>
  );
};

export default NavBar;
