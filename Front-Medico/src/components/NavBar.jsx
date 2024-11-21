"use client"; // Não esqueça de incluir essa linha

import React, { useState, useEffect } from 'react';
import NavBarCategory from './NavBarCategory';
import inicioImg from '../../public/img/inicio.png';
import agendaImg from '../../public/img/calendario.png';
import notificacoesImg from '../../public/img/notificacoes.png';
import ajustesImg from '../../public/img/ajustes.png';
import sairImg from '../../public/img/sair.png';
import ConfirmationModal from './ConfirmationModal'; // Importando o modal de confirmação

const NavBar = () => {
  const [medico, setMedico] = useState(null);
  const [nome, setNome] = useState('Carregando...');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedico = async () => {
      const medicoId = localStorage.getItem('idC');
      if (!medicoId || isNaN(medicoId)) {
        setNome('Erro: ID do médico inválido.');
        return;
      }

      try {
        const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/medico/${medicoId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Erro ao buscar os dados do médico');
        }

        if (data.medico && data.medico.length > 0) {
          setMedico(data.medico[0]);
          setNome(`Dr. ${data.medico[0].nome_medico}`);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do médico', error);
        setNome('Erro ao buscar os dados do médico.');
      }
    };

    fetchMedico();
  }, []);

  const handleLogout = () => {
    // A lógica de logout, como limpar o localStorage e redirecionar
    localStorage.removeItem('idC');
    window.location.href = '/'; // Redirecionar para a página de login
  };

  return (
    <div className="bg-[--azulescuro] text-white w-64 min-h-screen flex flex-col py-6 px-4">
      <div className="top-0">
        <img className="h-[60px]" src="/img/logo.png" alt="Logo" />
      </div>

      <div className="flex items-center justify-center mt-20">
        <div className="">
          <img src="#/public/img/medico.png" alt="" />
        </div>
      </div>

      <h1 className="flex items-center justify-center font-poppins mt-4">
        Olá, {nome}
      </h1>

      <ul className="mt-[8vh]" id="categoria">
        <li className="mb-6">
          <NavBarCategory category={"/inicio"} images={inicioImg} title={"Ínicio"} />
        </li>
        <li className="mb-6">
          <NavBarCategory category={"/consultas"} images={agendaImg} title={"Agenda"} />
        </li>
        <li className="mb-6">
          <NavBarCategory category={"/notificacoes"} images={notificacoesImg} title={"Notificações"} />
        </li>
        <li className="mb-6">
          <NavBarCategory category={"/"} images={ajustesImg} title={"Ajustes"} />
        </li>

        {/* Sair da Conta com confirmação */}
        <li className="mb-6">
          <NavBarCategory 
            category={"#"} 
            images={sairImg} 
            title={"Sair"} 
            onClick={() => setIsModalOpen(true)} // Chama setIsModalOpen quando clicado
          />
        </li>
      </ul>

      {/* Modal de confirmação */}
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </div>
  );
};

export default NavBar;
