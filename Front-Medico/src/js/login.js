import { Result } from "postcss";

const validarLogin = async (crm, senha) => {
  if (!crm || !senha) {
    return { success: false, message: 'Por favor, preencha todos os campos!' };
  }

  try {
    const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/loginMedico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crm, senha }),
    });

    const result = await response.json();

    if (response.ok && result.status_code === 200) {
      localStorage.setItem('idC', result.id_medico); // Corrigido aqui para usar id_medico
      return { success: true }; // Login bem-sucedido
    } else {
      return { success: false, message: result.message || 'CRM ou senha incorretos.' };
    }
  } catch (error) {
    console.error('Erro:', error);
    return { success: false, message: 'Erro ao conectar com o servidor.' };
  }
};

console.log(Result);
export default validarLogin;
