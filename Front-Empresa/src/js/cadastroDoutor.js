import { useRef } from 'react';

const CadastroDoutor = () => {
  const cadastroMedicoRef = useRef(null);

  const handleCadastroClick = async () => {
    // Obtém os valores diretamente
    const nome = document.getElementById('nome')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const senha = document.getElementById('senha')?.value || '';
    const crm = document.getElementById('crm')?.value || '';
    const telefone = document.getElementById('telefone')?.value || '';
    const data_nascimento = document.getElementById('dataNascimento')?.value || '';
    const foto_medico = document.getElementById('fotoMedico')?.value || '';
    const descricao = document.getElementById('descricao')?.value || '';

    let especialidades = [];
    const optionsElement = document.getElementById('options');
    if (optionsElement) {
      // Verifica se o select permite múltiplas escolhas e se possui opções selecionadas
      if (optionsElement.multiple && optionsElement.selectedOptions) {
        especialidades = Array.from(optionsElement.selectedOptions).map(option => option.value);
      } else if (!optionsElement.multiple) {
        especialidades = optionsElement.value ? [optionsElement.value] : [];
      }
    } else {
      console.error('Elemento options não encontrado');
    }

    const userData = {
      nome,
      email,
      senha,
      crm,
      telefone,
      data_nascimento,
      foto_medico,
      especialidades,
      descricao
    };

    try {
      console.log(userData);
      const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v2/vital/medico', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

  return (
    <button
      id="cadastro"
      ref={cadastroMedicoRef}
      onClick={handleCadastroClick}
      className="bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[130vh] mt-[10vh]"
    >
      <h1 className="text-white font-bold">CADASTRAR DOUTORES +</h1>
    </button>
  );
};

export default CadastroDoutor;
