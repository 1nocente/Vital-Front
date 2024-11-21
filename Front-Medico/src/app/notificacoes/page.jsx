// src/app/notificacoes/page.jsx
"use client"; // Adicione esta linha no topo do arquivo

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react"; 
import { io } from 'socket.io-client'; 
import NotificacaoCard from "@/components/NotificacoesCard"; 

const socket = io('http://localhost:3000'); // Altere para a URL do seu servidor

export default function Notificacoes() {
    const [notificacoes, setNotificacoes] = useState([]);

    useEffect(() => {
        const handleNotificacao = (novaNotificacao) => {
            setNotificacoes((prevNotificacoes) => [...prevNotificacoes, novaNotificacao]);
        };

        socket.on('notificacao', handleNotificacao);

        return () => {
            socket.off('notificacao', handleNotificacao);
        };
    }, []);

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                 
                    <div>
                        <h1 className="text-2xl font-bold text-[--cinza] p-10">Notificações</h1>
                    </div>

                    {/* Renderizando as notificações */}
                    <div>
                        {notificacoes.length === 0 ? (
                            <p className="text-gray-500">Nenhuma notificação.</p>
                        ) : (
                            notificacoes.map((notificacao) => (
                                <NotificacaoCard key={notificacao.id} notificacao={notificacao} />
                            ))
                        )}
                    </div>

                
                </div>
            </NavBarLayout>
        </div>
    );
}