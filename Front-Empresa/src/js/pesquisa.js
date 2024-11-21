
import { getConsultas } from '@/js/info'; // Exemplo de função para conexão ao banco

export default async (req, res) => {
  const { query } = req.query;
  const db = await getConsultas();

  try {
    const results = await db.collection('sua_colecao').find({ name: { $regex: query, $options: 'i' } }).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados', error });
  }
};
