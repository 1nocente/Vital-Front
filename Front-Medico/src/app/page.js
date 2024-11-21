"use client";

import React, { useState } from 'react';
import Modal from "@/components/Modal";
import validarLogin from '@/js/login.js';

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [senha, setSenha] = useState('');
  const [crm, setCrm] = useState('');
  const [error, setError] = useState(null);
  const [isCrmInvalid, setIsCrmInvalid] = useState(false);
  const [isSenhaInvalid, setIsSenhaInvalid] = useState(false);

  const handleEntrar = async (e) => {
    e.preventDefault();
    setError(null);
    setIsCrmInvalid(false);
    setIsSenhaInvalid(false);

    try {
      const result = await validarLogin(crm, senha);

      if (!result.success) {
        setError(result.message);
        if (result.message.includes('CRM')) setIsCrmInvalid(true);
        if (result.message.includes('senha')) setIsSenhaInvalid(true);
      } else {
        window.location.href = '/inicio'; // Redirecionamento para a página inicial
      }
    } catch (error) {
      console.error("Erro ao realizar o login", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center bg-medico-padrao"></div>
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-[--azulprincipal] font-poppins">Login</h1>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <form className="w-[60vh]" onSubmit={handleEntrar}>
          <div className="mb-4 relative">
            <label htmlFor="crm">CRM</label>
            <input
              type="text"
              id="crm"
              className={`border ${isCrmInvalid ? 'border-red-500' : 'border-gray-300'} rounded p-2 pl-10 pr-10 w-full`}
              placeholder="Seu crm"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              className={`border ${isSenhaInvalid ? 'border-red-500' : 'border-gray-300'} rounded p-2 pl-10 pr-10 w-full`}
              placeholder="Sua Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            id='entrar'
            type="submit"
            className="bg-[--azulprincipal] text-white rounded-lg p-2 w-full"
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center mt-4">
          <p className="text-gray-700">Esqueceu sua senha?</p>
          <button onClick={() => setOpenModal(true)} className="ml-2 text-blue-500 font-bold">
            Clique aqui
          </button>
        </div>

        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />
      </div>
    </div>
  );
};

export default Login;
