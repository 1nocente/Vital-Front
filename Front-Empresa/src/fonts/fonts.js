// Arquivo para importar as fontes do projeto

import { Poppins } from "next/font/google";

export const poppins = Poppins ({
    weight: ['400', '800'],
    subsets: ['latin'],
    variable: '--font-poppins'
})