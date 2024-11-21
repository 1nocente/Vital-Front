import { useEffect } from 'react';
import { getEspecialidade, getMedico } from '@/js/info.js';

const CadastroConsulta = () => {
  useEffect(() => {
    async function preencherSelects() {
      // Preencher especialidades
      const especialidadeSelect = document.getElementById('especialidade');
      const listaEspecialidade = await getEspecialidade();
      
      if (especialidadeSelect && Array.isArray(listaEspecialidade) && listaEspecialidade.length > 0) {
        listaEspecialidade.forEach((especialidade) => {
          const option = document.createElement('option');
          option.value = especialidade.id_especialidade || ""; // Garante que o valor não esteja vazio
          option.textContent = especialidade.nome || "Especialidade não informada";
          especialidadeSelect.appendChild(option);
        });
      } else {
        console.warn("Nenhuma especialidade encontrada ou elemento 'especialidade' não carregado.");
      }

      // Preencher médicos
      const medicoSelect = document.getElementById('medico');
      const listaMedico = await getMedico();

      if (medicoSelect && Array.isArray(listaMedico) && listaMedico.length > 0) {
        listaMedico.forEach((medico) => {
          const option = document.createElement('option');
          option.value = medico.id_medico || ""; // Garante que o valor não esteja vazio
          option.textContent = medico.nome || "Médico não informado";
          medicoSelect.appendChild(option);
        });
      } else {
        console.warn("Nenhum médico encontrado ou elemento 'medico' não carregado.");
      }
    }

    preencherSelects(); // Preenche os selects ao carregar o componente

    const CadastroConsultaButton = document.getElementById('cadastro');
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');

    if (CadastroConsultaButton && especialidadeSelect && medicoSelect) {
      CadastroConsultaButton.addEventListener('click', async () => {
        const p_nome_medico = medicoSelect.value;
        const p_nome_especialidade = especialidadeSelect.value;
        const p_detalhes_consulta = document.getElementById('detalhes').value;
        const p_dias_consulta = document.getElementById('date').value;
        const p_horas_consulta = document.getElementById('horario').value;

        const userData = {
          p_nome_medico,
          p_nome_especialidade,
          p_detalhes_consulta,
          p_dias_consulta,
          p_horas_consulta,
        };

        try {
          const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v2/vital/consulta', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            redirect: 'manual',
          });

          if (response.ok) {
            alert('Consulta cadastrada com sucesso!');
            window.location.href = '/consultas';
          } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const result = await response.json();
              alert(`Erro: ${result.message}`);
            } else {
              const resultText = await response.text();
              console.error("Erro ao cadastrar consulta:", resultText);
              alert("Erro ao cadastrar consulta. Resposta inesperada do servidor.");
            }
          }
        } catch (error) {
          console.error('Erro ao cadastrar consulta:', error);
          alert('Erro ao cadastrar consulta. Tente novamente.');
        }
      });

      // Cleanup: remover o listener para evitar memory leaks
      return () => {
        CadastroConsultaButton.removeEventListener('click', () => {});
      };
    } else {
      console.error('Algum elemento não foi encontrado no DOM.');
    }
  }, []); // Executa apenas uma vez na montagem do componente

  return null;
};

export default CadastroConsulta;
