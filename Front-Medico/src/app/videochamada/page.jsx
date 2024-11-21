"use client";

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Videochamada = () => {
    const router = useRouter();
    const [meetingUrl, setMeetingUrl] = useState(null);

    const createMeeting = async () => {
        try {
            const response = await axios.get("https://callvital.onrender.com/generate-meeting");
            setMeetingUrl(response.data.url);
        } catch (error) {
            console.error("Erro ao gerar reunião:", error);
        }
    };

    const endMeeting = () => {
        // Define a URL da reunião como null para encerrar a reunião
        setMeetingUrl(null);
    };

    return (
        <NavBarLayout>
            <div className="flex flex-col items-center p-4">
                <h1 className="text-xl font-semibold mb-4">
                    Consulta ID: {router.query && router.query.id ? router.query.id : 'Carregando...'}
                </h1>
                <button
                    onClick={meetingUrl ? endMeeting : createMeeting}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {meetingUrl ? "Encerrar Reunião" : "Criar Reunião"}
                </button>
                <div id="meeting-container" className="w-full">
                    {meetingUrl ? (
                        <iframe
                            title="Jitsi Meeting"
                            src={meetingUrl}
                            style={{ width: '100%', height: '500px', border: 'none' }}
                            allow="camera; microphone; fullscreen"
                        ></iframe>
                    ) : (
                        <p className="text-gray-600">Aguardando a criação da chamada de vídeo...</p>
                    )}
                </div>
            </div>
        </NavBarLayout>
    );
};

export default Videochamada;
