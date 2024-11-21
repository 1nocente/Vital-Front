'use client';

import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4">
        <h2 className="font-bold text-2xl text-[--azulescuro] font-sans mb-4 flex items-center justify-center">
          Tem certeza que deseja sair?
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onConfirm} // Ação ao confirmar
            className="bg-[--azulescuro] w-32 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            Sim
          </button>
          <button
            onClick={onClose} // Fecha o modal
            className="bg-gray-300 w-32 text-[--azulescuro] font-bold px-4 py-2 rounded-lg hover:bg-blue-300"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
