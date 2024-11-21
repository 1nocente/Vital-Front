'use client'; // Importante para habilitar o Client Component
import React, { useState } from 'react';

const CadastroEmpresa = () => {
  const [formData, setFormData] = useState({
    nome_empresa: '',
    nome_proprietario: '',
    email: '',
    senha: '',
    cnpj: '',
    telefone: '',
    telefone_clinica: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // Função para atualizar o estado conforme os campos mudam
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Função de cadastro ao clicar no botão
  const handleCadastro = async () => {
    try {
      const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        redirect: 'manual', // Evita redirecionamento automático
      });

      if (response.ok) {
        const result = await response.json();
        alert('Usuário cadastrado com sucesso!');
        console.log(result);
        window.location.href = '@/app/login/page.jsx'; // Redireciona para a página de login
      } else {
        const result = await response.json();
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div>
      <input
        type="text"
        id="nomeEmpresa"
        value={formData.nomeEmpresa}
        onChange={handleChange}
        placeholder="Nome da empresa"
      />
      <input
        type="text"
        id="cep"
        value={formData.cep}
        onChange={handleChange}
        placeholder="CEP"
      />
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
};

export default CadastroEmpresa;
