import React, {useContext} from "react";
import SessionContext from "../session/session";
import { host_ip } from "../constants/host_ip";
import { FormBackground, PrimaryButton, PrimaryInput } from "../components/reusables";
import { FormTitle } from "../components/reusables";
import { listFromForm, fetchWithAuthorization } from "../functions/forms";
import { Checkbox } from "../components/reusables";
import { PagePaths } from "../constants/paths";

function default_with_zero(data, properties){
    console.log(properties)
    for(const property in data){
        if(data[property] == "" && properties.includes(property)){
            data[property] = 0
        }
    }
    return data;
}

function Content() {
    const { session } = useContext(SessionContext);
    
    async function add_record(){
        const form = document.querySelector('form');
        let data = listFromForm(form);
        data = default_with_zero(data, ['ejemplares', 'ca', 'volumen', 'coleccion']);
        console.log(data)
        fetchWithAuthorization(`${host_ip}/card`, "post", data, session.token)
            .then(res=>{
                if(res.status == 200){
                    console.log('Se agregó el libro con éxito');
                }})
            .catch(err => console.error(err));
    }

    function clear_form(){
        const inputs = document.querySelectorAll('input');
        inputs.forEach((item, index)=>{
            item.value = "";
        })
    }

    return (
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" />
            <PrimaryInput title="ISNB" name="isbn" />
            <PrimaryInput title="Autor(es)" name="autor" />
            
            <FormTitle title="Clasificación" is_required={true} />
            <Checkbox title="Es Referencia" name="esReferencia" /> 
            <PrimaryInput title="Dewey" name="dewey" />
            <PrimaryInput title="Cutter" name="cutter" />


            <FormTitle title="Datos de Edición" is_required={true} />
            <PrimaryInput title="Editorial" name="editorial" />
            <PrimaryInput title="Edición" name="edicion" />
            <PrimaryInput title="Ciudad" name="ciudad" />
            <PrimaryInput title="Año" name="ano" />


            <FormTitle title="Datos de Registro" is_required={false} />
            <PrimaryInput title="Colección" name="coleccion" />
            <PrimaryInput type="Number" title="N° Ej. o Vol." name="ejemplares" />

            <FormTitle title="Medidas Físicas" is_required={false} />
            <PrimaryInput type="Number" title="Largo de Carátula" name="ca" />
            <PrimaryInput type="Number" title="Pág. o Vol." name="volumen" />

            <div className="pt-6 flex space-x-4 place-content-around w-[100%]">
                <PrimaryButton title="Guardar" onClick={add_record} />
                <PrimaryButton title="Eliminar" onClick={clear_form} />
            </div>

            <PrimaryButton title="Salir" path={PagePaths['Books']} />

        </form>
    );
}

const Record = () => {
    return (
        <FormBackground content=<Content /> />
    );
}

export default Record; 
