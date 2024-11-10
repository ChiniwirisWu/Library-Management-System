import React from "react";
import { MainPage } from "./components/reusables";
import { GetPathTitle } from "./constants/pages";
import { PagePaths } from "./constants/paths";

function Content() {
    return (
        <div className="text-xl flex flex-col h-[100%] w-[100%] items-center content-center  text-center">
            <div class="w-3/4 min-h-[125px] py-5 px-10 bg-gray-50 border-solid border-[1px] border-gray rounded-sm mt-10 flex items-center justify-between ">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">(Titulo del libro)</p>
                    <p class="text-base">12.345.678 • Josefina Lopez • 0414-1234567 • Bna</p>
                </div>
                <div class="flex space-x-5">
                    <button class="w-[95px] p-2 border-2 border-solid border-[#00AC4E] rounded-md text-[#00AC4E] hover:text-white hover:bg-[#00AC4E] transition-all">Aceptar</button>
                    <button class="w-[95px] p-2 border-2 border-solid border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-all">Rechazar</button>
                </div>
            </div>
            <div class="w-3/4 min-h-[125px] py-5 px-10 bg-gray-50 border-solid border-[1px] border-gray rounded-sm mt-5 flex items-center justify-between ">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">(Titulo del libro)</p>
                    <p class="text-base">12.345.678 • Alfonso Guzman • 0414-1234567 • Pto</p>
                </div>
                <div class="flex space-x-5">
                    <button class="w-[95px] p-2 border-2 border-solid border-[#00AC4E] rounded-md text-[#00AC4E] hover:text-white hover:bg-[#00AC4E] transition-all">Aceptar</button>
                    <button class="w-[95px] p-2 border-2 border-solid border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-all">Rechazar</button>
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200 ">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">ISBN</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Fecha</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Duración</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Trabajador</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Cédula</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Nombre</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Apellido</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Dirección</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Teléfono</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Teléfono Vecino</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100 transition-all">
                        <td className="py-2 px-4 border-b border-gray-200">978-3-16-148410-0</td>
                        <td className="py-2 px-4 border-b border-gray-200">2023-10-01</td>
                        <td className="py-2 px-4 border-b border-gray-200">30 días</td>
                        <td className="py-2 px-4 border-b border-gray-200">Juan Pérez</td>
                        <td className="py-2 px-4 border-b border-gray-200">12345678</td>
                        <td className="py-2 px-4 border-b border-gray-200">Josefina</td>
                        <td className="py-2 px-4 border-b border-gray-200">Lopez</td>
                        <td className="py-2 px-4 border-b border-gray-200">Calle Falsa 123</td>
                        <td className="py-2 px-4 border-b border-gray-200">0414-1234567</td>
                        <td className="py-2 px-4 border-b border-gray-200">0414-7654321</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition-all">
                        <td className="py-2 px-4 border-b border-gray-200">978-1-23456-789-7</td>
                        <td className="py-2 px-4 border-b border-gray-200">2023-10-02</td>
                        <td className="py-2 px-4 border-b border-gray-200">15 días</td>
                        <td className="py-2 px-4 border-b border-gray-200">Maria Gomez</td>
                        <td className="py-2 px-4 border-b border-gray-200">87654321</td>
                        <td className="py-2 px-4 border-b border-gray-200">Alfonso</td>
                        <td className="py-2 px-4 border-b border-gray-200">Guzman</td>
                        <td className="py-2 px-4 border-b border-gray-200">Avenida Siempre Viva 742</td>
                        <td className="py-2 px-4 border-b border-gray-200">0414-9876543</td>
                        <td className="py-2 px-4 border-b border-gray-200">0414-3456789</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Loans = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Loans'])} content=<Content /> />
    );
}

export default Loans;