"use client"; // Adiciona esta linha para tornar o componente um Client Component
import React, { useState, useEffect } from 'react';
import "../../styles/globals.css";
import Swal from 'sweetalert2';


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

  

    const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('https://vital-umqy.onrender.com/v2/vital/empresa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                redirect: 'manual',
            });
    
            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.href = '/login';
                });
            } else {
                const result = await response.json();
                Swal.fire({
                    title: 'Erro!',
                    text: result.message || 'Erro ao cadastrar empresa.',
                    icon: 'error',
                    confirmButtonText: 'Tentar novamente',
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao cadastrar empresa. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente',
            });
        }
    };

    async function pegarCep(cep) {
        try {
            cep = cep.trim().replace(/\D/g, '');
            if (cep.length !== 8) {
                throw new Error("CEP inválido. O CEP deve ter 8 dígitos.");
            }
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar o CEP. Verifique a URL ou o CEP digitado.");
            }
            const cepInfo = await response.json();
            if (cepInfo.erro) {
                throw new Error("CEP não encontrado.");
            }
            return cepInfo;
        } catch (error) {
            console.error(error.message);
            alert(error.message);
            return null;
        }
    }

    const preencherCampos = async () => {
        const cepInfo = await pegarCep(formData.cep);
        if (cepInfo) {
            setFormData((prevData) => ({
                ...prevData,
                logradouro: cepInfo.logradouro || '',
                bairro: cepInfo.bairro || '',
                cidade: cepInfo.localidade || '',
                estado: cepInfo.uf || '',
            }));
        }
    };

    // Adiciona o evento no input do CEP apenas no lado do cliente
    useEffect(() => {
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', preencherCampos);
        }
        
        // Remove o evento quando o componente for desmontado
        return () => {
            if (cepInput) {
                cepInput.removeEventListener('blur', preencherCampos);
            }
        };
    }, [formData.cep]);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 min-h-screen">
            <div>
                <img 
                    src="./img/fundo-cadastro.png" 
                    alt="" 
                    className="w-full h-full relative" 
                />
            </div>

            <div className="bg-blue-300/75 w-3/5 h-auto ml-[390px] items-center rounded-lg mt-[-270px] absolute">
                <div className="ml-96 flex">
                    <img 
                        src="./img/logo.png" 
                        alt="" 
                        className="w-24" 
                    />
                    <h2 className="font-bold font-sans text-2xl text-blue-900 mt-10 ml-10">CADASTRO</h2>
                </div>
                <form onSubmit={handleCadastro}>

                    {/* Nome da Empresa */}
                    <div className="flex mt-10 ml-16">
                        <div>
                            <label htmlFor="nomeEmpresa" className="block text-stone-500 text-base font-sans mb-2 text-lg">Nome da empresa</label>
                            <input 
                                type="text" 
                                id="nomeEmpresa" 
                                name="nome_empresa"
                                value={formData.nome_empresa}
                                onChange={handleChange}
                                placeholder="Nome da empresa" 
                                className="shadow-2xl w-72 h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/empresa.png" 
                                alt="" 
                                className="ml-60 mt-[-37px] w-10" 
                            />
                        </div>

                        {/* Nome do Proprietário */}
                        <div className="ml-10">
                            <label htmlFor="nomeProprietario" className="block text-stone-500 text-base font-sans mb-2 text-lg">Nome do proprietário</label>
                            <input 
                                type="text" 
                                id="nomeProprietario" 
                                name="nome_proprietario"
                                value={formData.nome_proprietario}
                                onChange={handleChange}
                                placeholder="Nome do proprietário" 
                                className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/pessoa.icon.png" 
                                alt="" 
                                className="ml-60 mt-[-35px] w-7" 
                            />
                        </div>
                    

                    {/* CEP */}
                    <div className="ml-10">
                        <label htmlFor="cep" className="block text-stone-500 text-base font-sans mb-2 text-lg">CEP</label>
                        <input 
                            type="text" 
                            id="cep" 
                            name="cep"
                            value={formData.cep}
                            placeholder="123.456.789/10" 
                            maxLength="9" 
                            className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                        <img 
                            src="./img/local.png" 
                            alt="" 
                            className="ml-60 mt-[-35px] w-7" 
                        />
                    </div>
                    
                    </div>

                    {/* Email */}
                    <div className="flex">
                        <div className="mt-4 ml-16">
                            <label htmlFor="email" className="block text-stone-500 text-base font-sans mb-2 text-xl">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                placeholder="seu@email.com" 
                                onChange={handleChange}
                                className="shadow-2xl w-[620px] h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/email.png" 
                                alt="" 
                                className="ml-96 pl-60 mt-[-37px] w-10" 
                            />
                        </div>

                        {/* Logradouro */}
                        <div className="ml-8 mt-4">
                            <label htmlFor="logradouro" className="block text-stone-500 text-base font-sans mb-2 text-lg">Logradouro</label>
                            <input 
                                type="text" 
                                id="logradouro" 
                                name="logradouro"
                                value={formData.logradouro}
                                onChange={handleChange}
                                className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div className="flex mt-10 ml-16">
                        <div>
                            <label htmlFor="senha" className="block text-stone-500 text-base font-sans mb-2 text-lg">Senha</label>
                            <div className="relative">
                            <input 
                                    type={showPassword ? "text" : "password"}
                                    id="senha" 
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="**********" 
                                    className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                                <img 
                                    onClick={togglePasswordVisibility} 
                                    src={showPassword ? "./img/eye_open.png" : "./img/eye_closed.png"} 
                                    alt={showPassword ? "Ocultar senha" : "Mostrar senha"} 
                                    className="absolute w-5 top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" 
                                />
                            </div>
                        </div>

                        {/* CNPJ */}
                        <div className="ml-10">
                            <label htmlFor="cnpj" className="block text-stone-500 text-base font-sans mb-2 text-lg">CNPJ</label>
                            <input 
                                type="text" 
                                id="cnpj" 
                                name="cnpj"
                                value={formData.cnpj}
                                onChange={handleChange}
                                placeholder="12345678" 
                                maxLength="11" 
                                className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/identificacao.png" 
                                alt="" 
                                className="ml-60 mt-[-37px] w-6" 
                            />
                        </div>
                        {/* Estado */}
                    <div className="ml-10">
                        <label htmlFor="estado" className="block text-stone-500 text-base font-sans mb-2 text-lg">Estado</label>
                        <input 
                            type="text" 
                            id="estado" 
                            name="estado"
                        
                            value={formData.estado}
                            onChange={handleChange}
                            className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex mt-8 ml-[-28px]">
                        <div className="ml-24">
                            <label htmlFor="telefone" className="block text-stone-500 text-base font-sans mb-2 text-lg">Telefone</label>
                            <input 
                                type="text" 
                                id="telefone" 
                                name="telefone"
                                 maxLength="11"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="(11)1234-5678" 
                                className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/fone.png" 
                                alt="" 
                                className="ml-60 mt-[-37px] w-5" 
                            />
                        </div>

                        <div className="ml-10">
                            <label htmlFor="telefoneClinica" className="block text-stone-500 text-base font-sans mb-2 text-lg">Telefone da Empresa</label>
                            <input 
                                type="text" 
                                id="telefoneClinica" 
                                name="telefone_clinica"
                                value={formData.telefone_clinica}
                                onChange={handleChange}
                               
                                maxLength="11" 
                                placeholder="(11)1234-5678" 
                                className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <img 
                                src="./img/fone.png" 
                                alt="" 
                                className="ml-60 mt-[-37px] w-5" 
                            />
                        </div>

                        {/* Cidade */}
                            <div className="ml-10">
                                <label htmlFor="cidade" className="block text-stone-500 text-base font-sans mb-1 text-lg">Cidade</label>
                                    <input 
                                     type="text" 
                                        id="cidade" 
                                        name="cidade"
                                        value={formData.cidade}
                                        onChange={handleChange}
                                        placeholder="" 
                                        className="shadow-2xl w-72 h-10 text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
    />
</div>
                    </div>

                    

                    {/* Botão de Cadastro */}
                    <div className="mt-20 mb-10 ml-96">
                        <button 
                            type="submit" 
                            className="bg-blue-900 text-white rounded-3xl w-80 h-14 text-2xl"
                        >
                            CADASTRAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroEmpresa;
