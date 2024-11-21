import "../styles/globals.css";
import {poppins} from '@/fonts/fonts'

export const metadata = {
  title: "Vital+",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${poppins.variable}`}>
      <body
        className={`min-h-screen font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}