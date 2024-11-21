"use client"; // Indica que o componente é um Client Component

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react";

// Função para pegar as consultas da API
async function getConsultas() {
  try {
    const response = await fetch("https://vital-umqy.onrender.com/v1/vital/consulta");
    if (!response.ok) throw new Error("Erro ao buscar dados");
    const data = await response.json();
    return data.consultas || [];
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}

async function getVideos() {
  try {
    const response = await fetch("https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/video");
    if (!response.ok) throw new Error("Erro ao buscar vídeos");
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
}

function ConsultaCard({ consulta }) {
  const especialidadeImg = consulta.especialidade?.[0]?.imagem_url || "Imagem não encontrada";
  const especialidade = consulta.especialidade?.[0]?.nome || "Especialidade não definida";
  const medicoImg = consulta.medico?.[0]?.foto_medico || "Sem imagem";
  const medicoNome = consulta.medico?.[0]?.nome_medico || "Médico não definido";
  const descricao = consulta.detalhes_consulta || "Descrição não disponível";
  const dia = new Date(consulta.dias_consulta).toLocaleDateString();
  const horario = new Date(consulta.horas_consulta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="bg-zinc-200 rounded-lg w-[280px] h-[400px] p-4"
      onClick={() => (window.location.href = "bconsultas")}
    >
      <img src={especialidadeImg} className="w-full h-40 object-cover rounded-md" alt="Especialidade" />
      <p className="text-blue-950 text-xl font-bold font-sans justify-center items-center flex mt-2">{especialidade}</p>
      <p className="text-blue-950 justify-center items-center flex">{descricao}</p>
      <div className="flex mt-[20px] items-center">
        <img src={medicoImg} className="rounded-full w-[50px] h-[50px] ml-[10px]" alt="Médico" />
        <h2 className="text-blue-950 text-lg font-bold ml-[10px] fonts-sans mt-[10px]">{medicoNome}</h2>
      </div>
      <div className="flex mt-[10px]">
        <p className="text-blue-950 ml-[20px] font-bold">Dia: {dia}</p>
        <p className="text-blue-950 ml-[20px] font-bold">Horário: {horario}</p>
      </div>
    </div>
  );
}


// Componente de Card de Vídeo
function VideoCard({ video }) {
  const thumbnail = video.thumbnail_url || "/img/default-thumbnail.png";
  const videoUrl = video.url_video || "#";
  const titulo = video.titulo_video || "Título não disponível";
  const descricao = video.descricao_video || "Descrição não disponível";

  return (
    <div className="bg-gray-100 rounded-lg w-[300px] h-auto p-4 shadow-md">
      <div className="relative bg-black w-full h-[180px] rounded-md overflow-hidden flex items-center justify-center">
        <img src={thumbnail} alt={titulo} className="w-full h-full object-cover" />
        <img
          src="/img/play-icon.png"
          alt="Play"
          className="absolute w-[50px] h-[50px] cursor-pointer"
          onClick={() => window.open(videoUrl, "_blank")}
        />
      </div>
      <h2 className="text-blue-950 text-lg font-bold mt-2">{titulo}</h2>
      <p className="text-gray-700 mt-1">{descricao}</p>
    </div>
  );
}

// Componente Principal
export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [consultas, setConsultas] = useState([]); // Estado para armazenar as consultas
  const [videos, setVideos] = useState([]); // Estado para armazenar os vídeos
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Carregar dados das consultas e vídeos
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      const dadosConsultas = await getConsultas();
      const dadosVideos = await getVideos();
      setConsultas(dadosConsultas);
      setVideos(dadosVideos);
      setLoading(false);
    };

    carregarDados();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const dados = searchTerm ? await buscarConsultas(searchTerm) : await getConsultas();
    setConsultas(dados);
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <NavBarLayout>
        <div className="flex-1 p-4">
          {/* Barra de Pesquisa */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="bg-[--navempresa] pl-3 pr-10 py-2 ml-[60vh] mt-[30px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-[70vh] top-[48px]">
              <img src="./img/lupa.png" alt="Buscar" className="w-7" />
            </button>
          </div>

          {/* Consultas */}
          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[30px]">CONSULTAS</h1>
          </div>
          <div className="flex mt-[30px] ml-[80px] grid overflow-x-scroll w-[1520px]">
            <div id="contanierConsulta" className="flex space-x-4 gap-4 mb-[20px]">
              {consultas.map((consulta, index) => (
                <ConsultaCard key={index} consulta={consulta} />
              ))}
            </div>
          </div>

          {/* Galeria de Vídeos */}
          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[50px]">GALERIA</h1>
          </div>
          <div className="flex flex-wrap gap-4 ml-[80px] mt-[20px]">
            {videos.length > 0 ? (
              videos.map((video, index) => <VideoCard key={index} video={video} />)
            ) : (
              <p className="text-gray-500">Nenhum vídeo disponível</p>
            )}
          </div>
        </div>
      </NavBarLayout>
    </div>
  );
}
