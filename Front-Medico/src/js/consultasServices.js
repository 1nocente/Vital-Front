// Arquivo para buscar as consultas do médico através do ID

export async function getConsultasMedico(medicoId) {
    try {
        const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/consulta/${medicoId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar consultas");
        }
        const data = await response.json();
        return data; // Exemplo de retorno: { quantidade: 120 }
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        return null;
    }
}