'use client';
import React, { useState } from "react";

export default function Modal({ isOpen, setModalOpen }) {
  const [email, setEmail] = useState('');

  if (isOpen) {
    return (
      <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/4">
          <h2 className="font-bold text-2xl text-[--azulescuro] font-sans mb-4 flex items-center justify-center">
            Recuperar Senha
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-stone-500 text-base font-sans mb-2 ">
              Digite seu E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-2xl w-full h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          {/* Centralizando os botões */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setModalOpen(false)} // Fecha o modal
              className="bg-[--azulescuro] w-32 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-900"
            >
              Enviar
            </button>
            <button
              onClick={() => setModalOpen(false)} // Fecha o modal
              className="bg-gray-300 w-32 text-[--azulescuro] font-bold px-4 py-2 rounded-lg hover:bg-blue-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}