import React from "react";


const NotificacaoCard = ({ notificacao }) => {
    return (
        <div>

            {/* Data da Notificacao */}
            <span className="text-gray-500">{new Date(notificacao.data).toLocaleString()}</span>

            {/* Imagem */}
            <div>
            <img 
                    src={notificacao.imagem} // Adiciona a URL da imagem
                    alt={notificacao.titulo} // Usa o título como descrição alternativa
                    className=""
                />
            </div>

            {/* Descricao da Notificacao */}
            <div>
                <h1>{notificacao.titulo}</h1>
                <p>{notificacao.descricao}</p>
            </div>

        </div>
    )
};

export default NotificacaoCard