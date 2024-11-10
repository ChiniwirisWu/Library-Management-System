import React from "react";
import { MainPage } from "./components/reusables";
import { GetPathTitle } from "./constants/pages";
import { PagePaths } from "./constants/paths";

function Content() {
    return (
        <div className="text-xl flex flex-col h-[100%] w-[100%] items-center content-center  text-center">
            <div class="w-3/4 min-h-[125px] py-5 px-10 bg-gray-50 border-solid border-[1px] border-gray rounded-sm mt-10 flex items-center justify-between ">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">(Usuario)</p>
                    <p class="text-base">Solicita una cuenta de trabajador.</p>  
                </div>
                <div class="flex space-x-5">
                    <button class="w-[95px] p-2 border-2 border-solid border-[#00AC4E] rounded-md text-[#00AC4E] hover:text-white hover:bg-[#00AC4E] transition-all">Aceptar</button>
                    <button class="w-[95px] p-2 border-2 border-solid border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-all">Rechazar</button>
                </div>
            </div>
            <div class="w-3/4 min-h-[125px] py-5 px-10 bg-gray-50 border-solid border-[1px] border-gray rounded-sm mt-5 flex items-center justify-between ">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">(Usuario)</p>
                    <p class="text-base">Solicita cambio de contrasena</p>  
                </div>
                <div class="flex space-x-5">
                    <button class="w-[95px] p-2 border-2 border-solid border-[#00AC4E] rounded-md text-[#00AC4E] hover:text-white hover:bg-[#00AC4E] transition-all">Aceptar</button>
                    <button class="w-[95px] p-2 border-2 border-solid border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-all">Rechazar</button>
                </div>
            </div>


            <div class="w-3/4 min-h-[125px] py-5 px-10 bg-gray-50 border-solid border-[1px] border-gray rounded-sm mt-10 flex items-center justify-between ">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">(Usuario)</p>
                    <p class="text-base">Admin</p>  
                </div>
                <div class="">
                    <button class="w-[95px] p-2 border-2 border-solid border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-all">Eliminar</button>
                </div>
            </div>
        </div>
    );
}

const Users = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Users'])} content=<Content /> />
    );
}

export default Users;