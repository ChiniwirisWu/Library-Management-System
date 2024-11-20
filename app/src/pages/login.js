import React from "react";
import { useContext } from "react";
import SessionContext from "../session/session";
import { Session } from "../session/session";
import { listFromForm, simpleFetch } from "../functions/forms";
import { TextLink } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { Form } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { TitleLink } from "../components/reusables";
import { userRoles } from "../constants/roles";
import {useNavigate} from "react-router-dom";

async function loginHandler(e, setSession, navigate){
    e.preventDefault();
    const data = listFromForm(e);
    const response = simpleFetch("http://10.42.0.1:9090/login", "post", data)   
    response.then(res => res.json())
            .then(res => {
                setSession(new Session(res.worker.rol, res.token));
                navigate(PagePaths['Home']);
            })
            .catch(err => console.error(err));
}

function Content() {

    let setSession = useContext(SessionContext).setSession;
    const navigate = useNavigate();

    return (
        <form onSubmit={(e)=>loginHandler(e, setSession, navigate)} class="text-xl flex flex-col">
            <LabeledInput type="text" text="Usuario" name="nombre" />
            <LabeledInput type="text" text="Contraseña" name="contrasena" />
            <button>Iniciar sesión</button>
            <div class="flex flex-col text-nowrap">
                <TextLink text="¿Olvidó su contraseña?" href={PagePaths["Password Change"]} />
                <TextLink text="Solicitud de registro" href={PagePaths["Signup"]} />
            </div>
        </form>
    );
}

const Login = () => {
    return (
        <Form title="Inicio de Sesión" className="max-w-[500px] w-[90%]" content=<Content /> />
    );
}

export default Login;
