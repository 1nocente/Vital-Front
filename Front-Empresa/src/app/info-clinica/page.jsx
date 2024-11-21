import NavBarLayout from "@/components/layout/NavBarLayout";
import Image from "next/image"; // Ajuste o caminho conforme necessário

export default function Inicio() {
    return (
        <div className="flex">
            <NavBarLayout>
            
                <div className="flex-1 p-4">
                    {/* <h1>Estou na Home</h1> */}
                    <h1 className="text-4xl font-bold text-[--font] p-10">EMPRESA</h1>

          
                  
            <div className="bg-blue-300 w-4/6 h-auto items-center rounded-lg">
                <div className="ml-36 mt-10">
                    <h2 className="font-bold font-sans text-3xl text-blue-900 mt-5">Informações sobre empresa</h2>
                </div>

                <div className="flex ml-[9vh] mt-[6vh]">
                    <img src="/Front/img/hospital-svgrepo-com 1.png" alt="" className="w-20" />
                    <h1 className="text-xl text-gray-400 mt-7 ml-14">Nome da Clinica</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-7 ml-36" />
                </div>

                <div className="flex ml-[11vh] mt-5">
                    <img src="/Front/img/heroicons_identification.png" alt="" className="w-14" />
                    <h1 className="text-xl text-gray-400 mt-3 ml-14">9876543</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-4 ml-36" />
                </div>

                <div className="flex ml-[11vh] mt-5">
                    <img src="/Front/img/map-tag-svgrepo-com 1.png" alt="" className="h-9" />
                    <h1 className="text-xl text-gray-400 mt-2 ml-16">Rua Alameda Araguaia</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-5 ml-20" />
                </div>

                <div className="flex ml-[12vh] mt-5">
                    <img src="/Front/img/fone.png" alt="" className="h-7" />
                    <h1 className="text-xl text-gray-400 mt-2 ml-16">(11)986759687</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-2 ml-36" />
                </div>

                <div className="h-40 w-96 bg-white mt-10 ml-36 rounded-lg">
                    <div className="bg-white w-5 h-5 rounded-lg"></div>
                    <div className="flex ml-5">
                        <img src="/Front/img/pessoa.icon.png" alt="" className="h-8" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">Responsável pela clinica</h1>
                        <img src="/Front/img/Vector.png" alt="" className="h-4 ml-9" />
                    </div>

                    <div className="flex mt-5 ml-5">
                        <img src="/Front/img/email.png" alt="" className="h-6" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">donoClinica@gmail.com</h1>
                    </div>

                    <div className="flex mt-5 ml-5">
                        <img src="/Front/img/fone.png" alt="" className="h-6" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">(11)48578576</h1>
                    </div>
                </div>

                <div className="bg-blue-300 h-20 w-10"></div>
            </div>


            


                    {/* Aqui você pode adicionar mais conteúdo */}
                </div>
            </NavBarLayout>
        </div>
    );
}

