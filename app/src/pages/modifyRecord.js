import React, {useContext} from "react";
import SessionContext from "../session/session";
import { host_ip } from "../constants/host_ip";
import { FormBackground, PrimaryButton, PrimaryInput } from "../components/reusables";
import { FormTitle } from "../components/reusables";
import { listFromForm, fetchWithAuthorization } from "../functions/forms";
import { Checkbox } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { useLocation } from "react-router-dom";
import { default_with_zero, default_with_string } from "../functions/forms";


function Content() {
    const location = useLocation();
    const book = default_with_string(location.state, ['ejemplares', 'ca', 'volumen', 'coleccion']);
    console.log(book)
    const { session } = useContext(SessionContext);
    
    async function update_record(isbn){
        const form = document.querySelector('form');
        let data = listFromForm(form);
        data = default_with_zero(data, ['ejemplares', 'ca', 'volumen', 'coleccion']);
        console.log(data);
        fetchWithAuthorization(`${host_ip}/card/${isbn}`, "put", data, session.token)
            .then(res=>{
                if(res.status == 200){
                    console.log('Se actualizó el libro con éxito');
                }})
            .catch(err => console.error(err));
    }

    async function delete_record(isbn){
        fetchWithAuthorization(`${host_ip}/card/${isbn}`, 'delete', {}, session.token)
            .then(res=> {
                if(res.status == 200){
                    console.log('Se eliminó el registro con éxito');
                }})
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" value={book.titulo} />
            <PrimaryInput title="ISNB" name="isbn" value={book.isbn} />
            <PrimaryInput title="Autor(es)" name="autor" value={book.autor} />
            
            <FormTitle title="Clasificación" is_required={true} />
            <Checkbox title="Es Referencia" name="esReferencia" value={book.esReferencia} /> 
            <PrimaryInput title="Dewey" name="dewey" value={book.dewey} />
            <PrimaryInput title="Cutter" name="cutter" value={book.cutter} />


            <FormTitle title="Datos de Edición" is_required={true} />
            <PrimaryInput title="Editorial" name="editorial" value={book.editorial} />
            <PrimaryInput title="Edición" name="edicion" value={book.edicion} />
            <PrimaryInput title="Ciudad" name="ciudad" value={book.ciudad} />
            <PrimaryInput title="Año" name="ano" value={book.ano} />


            <FormTitle title="Datos de Registro" is_required={false} />
            <PrimaryInput title="Colección" name="coleccion" value={book.coleccion} />
            <PrimaryInput type="Number" title="N° Ej. o Vol." name="ejemplares" value={book.ejemplares} />

            <FormTitle title="Medidas Físicas" is_required={false} />
            <PrimaryInput type="Number" title="Largo de Carátula" name="ca" value={book.ca} />
            <PrimaryInput type="Number" title="Pág. o Vol." name="volumen" value={book.volumen} />

            <div className="pt-6 flex space-x-4 place-content-around w-[100%]">
                <PrimaryButton title="Guardar" onClick={()=> update_record(book.isbn)} />
                <PrimaryButton title="Eliminar" onClick={()=> delete_record(book.isbn)} />
            </div>

            <PrimaryButton title="Salir" path={PagePaths['Books']} />

        </form>
    );
}

const ModifyRecord = () => {
    return (
        <FormBackground content=<Content /> />
    );
}

export default ModifyRecord; 
