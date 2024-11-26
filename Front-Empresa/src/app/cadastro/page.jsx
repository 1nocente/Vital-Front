"use client"; // Adiciona esta linha para tornar o componente um Client Component
import React, { useState, useEffect } from "react";
import "../../styles/globals.css";
import Swal from "sweetalert2";

const CadastroEmpresa = () => {
    const [formData, setFormData] = useState({
        nome_empresa: "",
        nome_proprietario: "",
        email: "",
        senha: "",
        cnpj: "",
        telefone: "",
        telefone_clinica: "",
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
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
        try {
            const response = await fetch(
                "https://vital-umqy.onrender.com/v2/vital/empresa",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                    redirect: "manual",
                }
            );

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    title: "Sucesso!",
                    text: "Usuário cadastrado com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
                const result = await response.json();
                Swal.fire({
                    title: "Erro!",
                    text: result.message || "Erro ao cadastrar empresa.",
                    icon: "error",
                    confirmButtonText: "Tentar novamente",
                });
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            Swal.fire({
                title: "Erro!",
                text: "Erro ao cadastrar empresa. Tente novamente.",
                icon: "error",
                confirmButtonText: "Tentar novamente",
            });
        }
    };

    async function pegarCep(cep) {
        try {
            cep = cep.trim().replace(/\D/g, "");
            if (cep.length !== 8) {
                throw new Error("CEP inválido. O CEP deve ter 8 dígitos.");
            }
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    "Erro ao buscar o CEP. Verifique a URL ou o CEP digitado."
                );
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
                logradouro: cepInfo.logradouro || "",
                bairro: cepInfo.bairro || "",
                cidade: cepInfo.localidade || "",
                estado: cepInfo.uf || "",
            }));
        }
    };

    useEffect(() => {
        const cepInput = document.getElementById("cep");
        if (cepInput) {
            cepInput.addEventListener("blur", preencherCampos);
        }
        return () => {
            if (cepInput) {
                cepInput.removeEventListener("blur", preencherCampos);
            }
        };
    }, [formData.cep]);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 min-h-screen flex items-center justify-center">
            <div className="bg-blue-300/75 w-3/5 h-auto flex flex-col items-center rounded-lg p-10">
                <div className="flex items-center justify-center mb-6">
                    <img src="./img/logo.png" alt="Logo" className="w-24" />
                    <h2 className="font-bold font-sans text-2xl text-blue-900 ml-4">
                        CADASTRO
                    </h2>
                </div>
                <form onSubmit={handleCadastro} className="w-full">
                    <div className="flex flex-col mb-6">
                        <label
                            htmlFor="nomeEmpresa"
                            className="block text-stone-500 text-base font-sans mb-2"
                        >
                            Nome da empresa
                        </label>
                        <input
                            type="text"
                            id="nomeEmpresa"
                            name="nome_empresa"
                            value={formData.nome_empresa}
                            onChange={handleChange}
                            placeholder="Nome da empresa"
                            className="shadow-2xl w-full h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label
                                htmlFor="nomeProprietario"
                                className="block text-stone-500 text-base font-sans mb-2"
                            >
                                Nome do proprietário
                            </label>
                            <input
                                type="text"
                                id="nomeProprietario"
                                name="nome_proprietario"
                                value={formData.nome_proprietario}
                                onChange={handleChange}
                                placeholder="Nome do proprietário"
                                className="shadow-2xl w-full h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label
                                htmlFor="email"
                                className="block text-stone-500 text-base font-sans mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                className="shadow-2xl w-full h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label
                                htmlFor="senha"
                                className="block text-stone-500 text-base font-sans mb-2"
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="senha"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="**********"
                                    className="shadow-2xl w-full h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <img
                                    onClick={togglePasswordVisibility}
                                    src={
                                        showPassword
                                            ? "./img/eye_open.png"
                                            : "./img/eye_closed.png"
                                    }
                                    alt={
                                        showPassword
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                    className="absolute w-5 top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label
                                htmlFor="cep"
                                className="block text-stone-500 text-base font-sans mb-2"
                            >
                                CEP
                            </label>
                            <input
                                type="text"
                                id="cep"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                placeholder="12345-678"
                                className="shadow-2xl w-full h-10 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-900 text-white rounded-3xl px-8 py-4 text-lg"
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
