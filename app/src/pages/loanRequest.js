import { FormBackground } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { FormTitle } from "../components/reusables";
import { PrimaryButton } from "../components/reusables";
import { PrimaryInput } from "../components/reusables";
import { useLocation } from "react-router-dom";

export const loan_types = {
    'info': 'info',
    'new': 'new', 
};

//columnas en la tabla de préstamos: (fk_isbn, fk_trabajador, fecha_inicio, fecha_final, dias, cedula, nombre, apellido, direccion, telefono, telefonoVecino, estado)

function Content({ loan_type }) {

    const location = useLocation();
    const entry = location.state;

    const isNew = loan_type === loan_types['new'];
    
    const previousPath = (isNew) ? PagePaths['Books'] : PagePaths['Loans'];
    const date = (isNew) ? (new Date()).toLocaleDateString("es-Ve") : entry.fecha_inicio;

    return (
        <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col space-y-4 bg-white max-w-[400px] w-[100%] my-auto mx-auto p-[40px] rounded-sm shadow-sm shadow-[grey]">

            <FormTitle title="Identificación de la Obra" is_required={true} />
            <PrimaryInput title="Título" name="titulo" value={ entry.titulo } is_required={true} is_disabled={true} has_title={true} />
            <PrimaryInput title="ISNB" name="isbn" value={ entry.isbn } is_required={true} is_disabled={true} has_title={true} />

            <FormTitle title="Encargado" is_required={true} />
            <PrimaryInput title="Encargado" name="encargado" value={"admin"} is_required={true} is_disabled={true} has_title={true} />

            <FormTitle title="Tiempo" is_required={true} />
            <PrimaryInput title="Fecha" name="encargado" value={date} is_required={true} is_disabled={true} has_title={true} />
            <PrimaryInput type="Number" title="Duración (Días)" name="duracion" value={(isNew) ? null : entry.dias} is_disabled={!isNew} is_required={true} />

            <FormTitle title="Prestatario" is_required={true} />
            <PrimaryInput title="Nombre" name="nombre" value={(isNew) ? null : entry.nombre + ' ' + entry.apellido} is_disabled={!isNew} is_required={true} />
            <PrimaryInput title="Cédula" name="cedula" value={(isNew) ? null : entry.cedula} is_disabled={!isNew} is_required={true} />
            
            <FormTitle title="Contacto" is_required={true} />
            <PrimaryInput title="Teléfono" name="telefono" value={(isNew) ? null : entry.telefono} is_disabled={!isNew} is_required={true} />
            <PrimaryInput title="Teléfono De Vecino" name="telefono_vecino" value={(isNew) ? null : entry.telefonoVecino} is_disabled={!isNew} is_required={true} />
            <PrimaryInput title="Dirección" name="direccion" value={(isNew) ? null : entry.direccion} is_disabled={!isNew} is_required={true} />

            <PrimaryButton title="Enviar" path={previousPath} />
            <PrimaryButton title="Salir" path={previousPath} />

        </form>
    );
}

const LoanRequest = ({ loan_type }) => {
    return (
        <FormBackground content=<Content loan_type={loan_type} /> />
    );
}

export default LoanRequest; 
