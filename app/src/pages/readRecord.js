import React, {useContext} from "react";
import { FormBackground, PrimaryButton, PrimaryInput } from "../components/reusables";
import { FormTitle } from "../components/reusables";
import { listFromForm, fetchWithAuthorization } from "../functions/forms";
import { Checkbox } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { useLocation } from "react-router-dom";

function default_with_string(data, properties){
    console.log(properties)
    for(const property in data){
        if(data[property] == 0 && properties.includes(property)){
            data[property] = ""
        }
    }
    return data;
}

function Content() {
    const location = useLocation();
    const book = default_with_string(location.state, ['ejemplares', 'ca', 'volumen', 'coleccion']);
    
    return (
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" value={book.titulo} is_disabled={true} />
            <PrimaryInput title="ISNB" name="isbn" value={book.isbn} is_disabled={true} />
            <PrimaryInput title="Autor(es)" name="autor" value={book.autor} is_disabled={true} />
            
            <FormTitle title="Clasificación" is_required={true} />
            <Checkbox title="Es Referencia" name="esReferencia" value={book.esReferencia} is_disabled={true} /> 
            <PrimaryInput title="Dewey" name="dewey" value={book.dewey} is_disabled={true} />
            <PrimaryInput title="Cutter" name="cutter" value={book.cutter} is_disabled={true} />


            <FormTitle title="Datos de Edición" is_required={true} />
            <PrimaryInput title="Editorial" name="editorial" value={book.editorial} is_disabled={true} />
            <PrimaryInput title="Edición" name="edicion" value={book.edicion} is_disabled={true} />
            <PrimaryInput title="Ciudad" name="ciudad" value={book.ciudad} is_disabled={true} />
            <PrimaryInput title="Año" name="ano" value={book.ano} is_disabled={true} />


            <FormTitle title="Datos de Registro" is_required={false} />
            <PrimaryInput title="Colección" name="coleccion" value={book.coleccion} is_disabled={true} />
            <PrimaryInput type="Number" title="N° Ej. o Vol." name="ejemplares" value={book.ejemplares} is_disabled={true} />

            <FormTitle title="Medidas Físicas" is_required={false} />
            <PrimaryInput type="Number" title="Largo de Carátula" name="ca" value={book.ca} is_disabled={true} />
            <PrimaryInput type="Number" title="Pág. o Vol." name="volumen" value={book.volumen} is_disabled={true} />

            <PrimaryButton title="Salir" path={PagePaths['Books']} />

        </form>
    );
}

const ReadRecord = () => {
    return (
        <FormBackground content=<Content /> />
    );
}

export default ReadRecord; 
