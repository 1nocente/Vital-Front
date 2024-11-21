"use client";

import React, { useEffect, useState } from "react";
import { getEspecialidade } from "@/js/info.js";

export default function Modal({ isOpen, setModalOpen }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    crm: '',
    data_nascimento: '',
    especialidades: '',
    foto_medico: '',
    descricao: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listaEspecialidade = await getEspecialidade();
        setEspecialidades(listaEspecialidade);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados_medico = { ...formData };

    try {
      const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v2/vital/medico', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados_medico),
      });

      if (response.ok) {
        alert('Médico cadastrado com sucesso!');
        window.location.href = '/doutores';
      } else {
        const result = await response.json();
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-2/3">
        <h2 className="font-bold text-3xl text-blue-950 font-sans mb-2 flex items-center justify-center">
          CADASTRAR DOUTOR
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-10">
            <div className="ml-10">
              <label htmlFor="nome"  className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Nome*
              </label>
              <input
              id="nome" 
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do proprietário"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src="./img/pessoa.icon.png" alt="Ícone Pessoa" className="ml-80 mt-[-35px] w-7" />
            </div>

            <div className="ml-12">
              <label htmlFor="telefone" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Telefone
              </label>
              <input
               id="telefone"
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11)1234-5678"
                className="shadow-2xl w-96 h-12 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src="./img/fone.png" alt="Ícone Telefone" className="ml-80 mt-[-37px] w-5" />
            </div>
          </div>

          <div className="flex">
            <div className="ml-10 mt-1">
              <label htmlFor="email" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Email*
              </label>
              <input
              id="email" 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seuemail@email.com"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src="./img/email.png" alt="Ícone Email" className="ml-80 mt-[-35px] w-6" />
            </div>

            <div className="ml-12 mt-1">
              <label htmlFor="options"  className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Escolha uma opção:
              </label>
              <select
                id="options"
                name="especialidades"
                value={formData.especialidades}
                onChange={handleChange}
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {especialidades.map((especialidades) => (
                  <option key={especialidades.nome} value={especialidades.nome}>
                    {especialidades.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex">
            <div className="ml-10 mt-1">
              <label htmlFor="senha" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Senha*
              </label>
              <input
              id="senha"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="***********"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src="./img/cadeado.png" alt="Ícone Cadeado" className="ml-80 mt-[-35px] w-6" />
            </div>

            <div className="ml-12 mt-1">
              <label htmlFor="dataNascimento" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Data de Nascimento
              </label>
              <input
              id="dataNascimento"
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                className="shadow-2xl w-96 h-12 text-blue-950 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex">
            <div className="ml-10 mt-1">
              <label htmlFor="crm" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                CRM*
              </label>
              <input
              id="crm"
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                placeholder="1234-56"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src="./img/identificacao.png" alt="Ícone CRM" className="ml-80 mt-[-35px] w-8" />
            </div>

            <div className="ml-10 mt-1">
              <label htmlFor="crm" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Foto Médico*
              </label>
              <input
              id="fotoMedico"
                type="text"
                name="foto_medico"
                value={formData.foto_medico}
                onChange={handleChange}
                placeholder="img.com"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>

          </div>

  

            <div className="flex mt-3">
            <div className="ml-10 mt-1">
              <label htmlFor="descricao" className="block text-stone-500 text-base font-sans mb-2 text-lg">
                Descrição*
              </label>
              <input
              id="descricao"
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="descrição"
                className="shadow-2xl w-96 h-12 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
             
            </div>

            <div className="ml-40 mt-[40px]">
              <button
                type="submit" 
                id="cadastro"
                className="bg-blue-950 text-white font-bold px-5 py-2 rounded-lg hover:bg-blue-900"
                >
                CADASTRAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}