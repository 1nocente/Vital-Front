import { Poppins } from 'next/font/google';
import '/src/styles/globals.css'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${poppins.variable}`}>
      <body className={`min-h-screen font-poppins`}>
        {children}
      </body>
    </html>
  );
}