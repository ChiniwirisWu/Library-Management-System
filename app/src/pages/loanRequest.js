import { FormBackground } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { FormTitle } from "../components/reusables";
import { PrimaryButton } from "../components/reusables";
import { PrimaryInput } from "../components/reusables";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import SessionContext from "../session/session";
import { listFromForm } from "../functions/forms";
import { is_fields_empty } from "../functions/objects";
import { fetchWithAuth } from "../functions/forms";
import { host_ip } from "../constants/host_ip";

export const loan_types = {
    'info': 'info',
    'new': 'new', 
};

async function add_loan(session){
    const form = document.querySelector('form');
    let data = listFromForm(form);
    if(!is_fields_empty(data)){
        console.log(data)
        fetchWithAuth(`${host_ip}/loan`, "post", data, session.token)
            .then(res=>{
                if(res.status == 200){
                    alert("Se agregó correctamente el préstamo.");
                }})
            .catch(err => {
                console.error(err)
            });
    }
}

//fk_isbn, fk_trabajador, fecha_inicio, fecha_final, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino

function Content({ loan_type }) {

    const { session } = useContext(SessionContext);

    const location = useLocation();
    const entry = location.state;

    const isNew = loan_type === loan_types['new'];
    
    const previousPath = (isNew) ? PagePaths['Books'] : PagePaths['Loans'];
    const date = ((isNew) ? new Date() :  new Date(entry.fecha_inicio)).toLocaleDateString("en-CA");
    const firstButton = (isNew) ? <PrimaryButton title="Enviar" onClick={ () => add_loan(session) } />: null;

    return (
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" value={ entry.titulo } is_required={true} is_disabled={!isNew} has_title={true} />
            <PrimaryInput title="ISNB" name="fk_isbn" value={ entry.isbn } is_required={true} is_disabled={!isNew} has_title={true} />

            <FormTitle title="Encargado" is_required={true} />
            <PrimaryInput title="Encargado" name="fk_trabajador" value={"admin"} is_required={true} is_disabled={!isNew} has_title={true} />

            <FormTitle title="Tiempo" is_required={true} />
            <PrimaryInput title="Fecha" name="fecha_inicio" value={date} is_required={true} is_disabled={!isNew} has_title={true} />
            <PrimaryInput type="Number" title="Duración (Días)" name="dias" value={(isNew) ? null : entry.dias} has_title={!isNew} is_disabled={!isNew} is_required={true} />

            <FormTitle title="Prestatario" is_required={true} />
            <PrimaryInput title="Nombre" name="nombre" value={(isNew) ? null : entry.nombre} is_disabled={!isNew} has_title={!isNew} is_required={true} />
            <PrimaryInput title="Apellido" name="apellido" value={(isNew) ? null : entry.apellido} is_disabled={!isNew} has_title={!isNew} is_required={true} />
            <PrimaryInput title="Cédula" name="cedula" value={(isNew) ? null : entry.cedula} is_disabled={!isNew} has_title={!isNew} is_required={true} />
            
            <FormTitle title="Contacto" is_required={true} />
            <PrimaryInput title="Teléfono" name="telefono" value={(isNew) ? null : entry.telefono} is_disabled={!isNew} has_title={!isNew} is_required={true} />
            <PrimaryInput title="Teléfono De Vecino" name="telefonoVecino" value={(isNew) ? null : entry.telefonoVecino} has_title={!isNew} is_disabled={!isNew} is_required={true} />
            <PrimaryInput title="Dirección" name="direccion" value={(isNew) ? null : entry.direccion} is_disabled={!isNew} has_title={!isNew} is_required={true} />

            <div className="pt-6 flex space-x-4 place-content-around w-[100%]">
                {firstButton}
                <PrimaryButton title="Salir" path={previousPath} />
            </div>

        </form>
    );
}

const LoanRequest = ({ loan_type }) => {
    return (
        <FormBackground content=<Content loan_type={loan_type} /> />
    );
}

export default LoanRequest; 
