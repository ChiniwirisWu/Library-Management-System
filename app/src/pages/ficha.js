import React from "react";
import { FormBackground } from "./components/reusables";
import { LabeledInput } from "./components/reusables";


function Content () {
    return (
        <div className="bg-white max-w-[800px] w-[100%] max-h-[95%] mx-auto mt-3 p-[40px] rounded-sm shadow-sm shadow-[grey]">
            <div className="flex justify-between">
                <div className="w-[45%]">
                    <LabeledInput text={"Título"} />
                </div>
                <div className="w-[45%]">
                    <LabeledInput text={"ISBN"} />
                </div>
            </div>
            <br></br>
            <div className="flex justify-between">
                <div className="w-[45%]">
                    <LabeledInput text={"Autor"} />
                </div>
                <div className="w-[45%]">
                    <LabeledInput text={"Edicion"} />
                </div>
            </div>
            <br></br>
            <div className="flex justify-between">
                <div className="w-2/5">
                    <LabeledInput text={"Editorial"} />
                </div>
                <div className="w-1/3">
                    <LabeledInput text={"Ciudad"} />
                </div>
                <div className="w-[12%]">
                    <LabeledInput text={"Ano"} />
                </div>
            </div>
            <br></br>
            <div className="flex justify-between">
                <div className="w-[20%]">
                    <LabeledInput text={"Pag. o vol."} />
                </div>
                <div className="w-[20%]">
                    <LabeledInput text={"Ca"} />
                </div>
                <div className="w-[20%]">
                    <LabeledInput text={"Coleccion"} />
                </div>
                <div className="w-[20%]">
                    <LabeledInput text={"N° Ej. o Vol."} />
                </div>
            </div>
            <br></br>
            <div className="flex justify-around">
            <button className="w-1/3 text-[#303F9F] bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-[#303F9F] hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none"><h1>Cancelar</h1></button>
            <button className="w-1/3 text-[#303F9F] bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-[#303F9F] hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none"><h1>Guardar</h1></button>
            </div>

        </div>        
    );
}

const Ficha = () => {
    return (
        <FormBackground content=<Content />/>
    );
}

export default Ficha; 