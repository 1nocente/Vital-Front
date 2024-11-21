// Arquivo para importar as fontes do projeto

import { Poppins } from "next/font/google";
import { Outfit } from "next/font/google";


export const poppins = Poppins ({
    weight: ['400', '800'],
    subsets: ['latin'],
    variable: '--font-poppins'
})


export const outfit = Outfit({
    weight: ['400', '700'], // Adicione os pesos que você precisa
    subsets: ['latin'],
    variable: '--font-outfit'
});