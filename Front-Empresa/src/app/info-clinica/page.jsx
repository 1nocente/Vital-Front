"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";

export async function getEmpresa(id) {
  const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/empresa/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.empresa[0];
}

function EmpresaCard({ empresa }) {
  const nomeEmpresa = empresa.nome_empresa || "Nenhum nome encontrado";
  const cnpj = empresa.cnpj || "CNPJ não definido";
  const cidade = empresa.cidade || "cidade não encontrada";
  const estado = empresa.estado || "estado não encontrado";
  const telefoneEmpresa = empresa.telefone_clinica || "telefone não encontrado";

  const nomeProprietario = empresa.nome_proprietario || "nome não encontrado";
  const email = empresa.email || "email não encontrado";
  const telefone = empresa.telefone || "telefone não encontrado";

  return (
    <div className="bg-blue-300 w-[70vh] h-[70vh] items-center rounded-lg ml-[570px] ">
      <div className="flex justify-center items-center">
        <h2 className="font-bold font-sans text-5xl text-blue-900 mt-12">
          INFORMAÇÕES DA EMPRESA
        </h2>
      </div>

      <div className="flex justify-center items-center ml-[-140px] mt-[6vh]">
        <img src="./img/EmpresaLogin.png" alt="" className="w-24" />
        <h1 className="text-3xl text-gray-500 mt-7 ml-[60px]">{nomeEmpresa}</h1>
      </div>

      <div className="flex justify-center items-center mt-5">
        <img src="./img/identificacao.png" alt="" className="w-14" />
        <h1 className="text-3xl text-gray-500 mt-3 ml-[60px]">{cnpj}</h1>
      </div>

      <div className="flex justify-center items-center ml-[-190px]">
        <div className="flex ml-[28vh] mt-5">
          <img src="./img/local.png" alt="" className="h-9" />
          <h1 className="text-3xl text-gray-500 mt-2 ml-[68px]">{cidade}, </h1>
        </div>
        <div className="flex  mt-5">
          <h1 className="text-3xl text-gray-500 mt-2 ml-1">{estado}</h1>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <img src="./img/fone.png" alt="" className="h-7" />
        <h1 className="text-3xl text-gray-500 mt-2 ml-[80px]">{telefoneEmpresa}</h1>
      </div>

      <div className="h-52 w-3/5 bg-white mt-10 ml-[200px] rounded-lg">
        <div className="bg-white w-5 h-5 rounded-lg"></div>
        <div className="flex ml-[100px]">
          <img src="./img/pessoa.icon.png" alt="" className="h-8 ml-[10px]" />
          <h1 className="text-gray-500 text-2xl mt-1 ml-16">{nomeProprietario}</h1>
        </div>

        <div className="flex mt-5 ml-[100px] ">
          <img src="./img/email.png" alt="" className="h-6 ml-[10px]" />
          <h1 className="text-gray-500 text-2xl mt-1 ml-16">{email}</h1>
        </div>

        <div className="flex mt-5 ml-[100px]">
          <img src="./img/fone.png" alt="" className="h-6 ml-[10px]"  />
          <h1 className="text-gray-500 text-2xl mt-1 ml-16">{telefone}</h1>
        </div>
      </div>

      <div className="flex justify-center items-center">
     <button className="bg-blue-900 text-xl w-[200px] h-[40px] mt-[20px] text-white rounded-full ">EDITAR</button>
     </div>


    </div>
  );
}

export default function Empresa() {
    const [empresa, setEmpresa] = useState([]); // Inicializa como array vazio
    const [idEmpresa, setIdEmpresa] = useState(null);
  
    useEffect(() => {
      async function carregarEmpresa() {
        try {
          const dados = await getEmpresa(idEmpresa);
          if (Array.isArray(dados)) {
            setEmpresa(dados);
          } else if (dados) {
            setEmpresa([dados]); // Envolve em um array se não for
          } else {
            setEmpresa([]);
            console.error("Dados da empresa não encontrados ou inválidos.");
          }
        } catch (error) {
          console.error("Erro ao carregar empresa:", error);
          setEmpresa([]);
        }
      }
  
      carregarEmpresa();
    }, [idEmpresa]);
  
    useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setEmpresa(userData.empresa || []); // Garante que seja um array
        setIdEmpresa(userData.id || null);
      }
    }, []);
  
    return (
      <div className="flex">
        <NavBarLayout>
          <div className="flex-1 p-4">
            <h1 className="text-5xl font-bold text-[--font]  mt-[50px] ml-10 mb-10">EMPRESA</h1>
            <div id="contanierEmpresa">
              {Array.isArray(empresa) && empresa.length > 0 ? (
                empresa.map((empresa, index) => (
                  <EmpresaCard key={index} empresa={empresa} />
                ))
              ) : (
                <p>Nenhuma empresa encontrada.</p>
              )}
            </div>
          </div>
        </NavBarLayout>
      </div>
    );
  }
  