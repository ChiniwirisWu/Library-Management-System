import React from "react";
import { FormBackground, PrimaryButton, PrimaryInput } from "../components/reusables";
import { FormTitle } from "../components/reusables";
import { Checkbox } from "../components/reusables";
import { PagePaths } from "../constants/paths";


function Content() {
    return (
        <div className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" />
            <PrimaryInput title="ISNB" />
            <PrimaryInput title="Autor(es)" />
            
            <FormTitle title="Clasificación" is_required={true} />
            <Checkbox title="Es Referencia" /> 
            <PrimaryInput title="Dewey" />
            <PrimaryInput title="Cutter" />


            <FormTitle title="Datos de Edición" is_required={true} />
            <PrimaryInput title="Editorial" />
            <PrimaryInput title="Edición" />
            <PrimaryInput title="Ciudad" />
            <PrimaryInput title="Año" />


            <FormTitle title="Datos de Registro" is_required={false} />
            <PrimaryInput title="Colección" />
            <PrimaryInput type="Number" title="N° Ej. o Vol." />

            <FormTitle title="Medidas Físicas" is_required={false} />
            <PrimaryInput type="Number" title="Largo de Carátula" />
            <PrimaryInput type="Number" title="Pág. o Vol." />

            <div className="pt-6 flex space-x-4 place-content-around w-[100%]">
                <PrimaryButton title="Guardar" />
                <PrimaryButton title="Eliminar" />
            </div>

            <PrimaryButton title="Salir" path={PagePaths['Books']} />

        </div>
    );
}

const Record = () => {
    return (
        <FormBackground content=<Content /> />
    );
}

export default Record; 