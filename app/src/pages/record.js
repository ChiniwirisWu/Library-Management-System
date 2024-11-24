import React, {useContext} from "react";
import SessionContext from "../session/session";
import { host_ip } from "../constants/host_ip";
import { FormBackground, PrimaryButton, PrimaryInput } from "../components/reusables";
import { FormTitle } from "../components/reusables";
import { listFromForm, fetchWithAuth } from "../functions/forms";
import { Checkbox } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { default_with_zero, default_with_string } from "../functions/objects";
import { is_fields_empty } from "../functions/objects";

export const record_types = {
    'new': 'new',
    'modify': 'modify',
    'info': 'info'  
};

async function delete_record(isbn, session){
    if(window.confirm("Seguro de elimar ésta ficha?")){
        fetchWithAuth(`${host_ip}/card/${isbn}`, 'delete', {}, session.token)
            .then(res=> {
                if(res.status == 200){
                    alert('Se eliminó el registro con éxito')
                }})
            .catch(err => console.log(err));
    }
};

async function update_record(isbn, session) {
    const form = document.querySelector('form');
        let data = listFromForm(form);
        if(!is_fields_empty(data, ['ejemplares', 'ca', 'volumen', 'coleccion'])){
            data = default_with_zero(data, ['ejemplares', 'ca', 'volumen', 'coleccion']);
            console.log(data);
            fetchWithAuth(`${host_ip}/card/${isbn}`, "put", data, session.token)
                .then(res=>{
                    if(res.status == 200){
                        alert('Se actualizó la ficha con éxito')
                    }})
                .catch(err => console.error(err));
        }
};

async function add_record(session){
    const form = document.querySelector('form');
    let data = listFromForm(form);
    if(!is_fields_empty(data, ['ejemplares', 'ca', 'volumen', 'coleccion'])){
        data = default_with_zero(data, ['ejemplares', 'ca', 'volumen', 'coleccion']);
        console.log(data)
        fetchWithAuth(`${host_ip}/card`, "post", data, session.token)
            .then(res=>{
                if(res.status == 200){
                    alert("Se creó correctamente la ficha.");
                }})
            .catch(err => {
                console.error(err)
            });
    }
}

function clear_form(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((item, index)=>{
        item.value = "";
    })
}

function RecordButtons({ record_type, isbn, session }) {
    
    if (record_type === record_types['info'])
        return null;

    let second_button_title = (record_type === record_types['new']) ? "Borrar": "Eliminar";
    
    let onFirst = (record_type === record_types['new']) 
        ? () => add_record(session)
        : () => update_record(isbn, session);
    
    let onSecond = (record_type === record_types['new']) 
        ? () => clear_form()
        : () => delete_record(isbn, session);

    return(
        <div className="pt-6 flex space-x-4 place-content-around w-[100%]">
            <PrimaryButton title="Guardar" onClick={onFirst} />
            <PrimaryButton title={second_button_title} onClick={onSecond} />
        </div>
    )
}

function Content({ record_type }) {

    const location = useLocation();

    const is_disabled = (record_type === record_types['info']);
    const has_title = (record_type !== record_types['new'] );

    const book = (record_type !== record_types['new']) ? default_with_string(location.state, ['ejemplares', 'ca', 'volumen', 'coleccion']) : null;
    console.log(book)

    const { session } = useContext(SessionContext);   

    return (
        <form id="myForm" onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" value={(book) ? book.titulo : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput title="ISNB" name="isbn" value={(book) ? book.isbn : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput title="Autor(es)" name="autor" value={(book) ? book.autor : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            
            <FormTitle title="Clasificación" is_required={true} />
            <Checkbox title="Es Referencia" name="esReferencia" value={(book) ? book.esReferencia : null} is_required={true} has_title={has_title} /> 
            <PrimaryInput title="Dewey" name="dewey" value={(book) ? book.dewey : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput title="Cutter" name="cutter" value={(book) ? book.cutter : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />


            <FormTitle title="Datos de Edición" is_required={true} />
            <PrimaryInput title="Editorial" name="editorial" value={(book) ? book.editorial : null} is_required={true} is_disabled={is_disabled} has_title={has_title}/>
            <PrimaryInput type="Number" title="Edición" name="edicion" value={(book) ? book.edicion : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput title="Ciudad" name="ciudad" value={(book) ? book.ciudad : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput title="Año" name="ano" value={(book) ? book.ano : null} is_required={true} is_disabled={is_disabled} has_title={has_title} />


            <FormTitle title="Datos de Registro" is_required={false} />
            <PrimaryInput type="Number" title="Colección" name="coleccion" value={(book) ? book.coleccion : null} is_disabled={is_disabled} has_title={has_title} />
            <PrimaryInput type="Number" title="N° Ej. o Vol." name="ejemplares" value={(book) ? book.ejemplares : null} is_disabled={is_disabled} has_title={has_title} />

            <FormTitle title="Medidas Físicas" is_required={false} />
            <PrimaryInput type="Number" title="Largo de Carátula" name="ca" value={(book) ? book.ca : null} is_disabled={is_disabled} has_title={has_title}/>
            <PrimaryInput type="Number" title="Pág. o Vol." name="volumen" value={(book) ? book.volumen : null} is_disabled={is_disabled} has_title={has_title}/>

            <RecordButtons record_type={record_type} isbn = {(book) ? book.isbn : null} session={session} />

            <PrimaryButton title="Salir" path={PagePaths['Books']} />

        </form>
    );
}

const Record = ({ record_type }) => {
    return (
        <FormBackground content=<Content record_type={record_type} /> />
    );
}

export default Record; 
