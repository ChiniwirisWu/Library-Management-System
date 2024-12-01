import React from "react";
import { useContext } from "react";
import SessionContext from "../session/session";
import { Session } from "../session/session";
import { listFromForm, simpleFetch } from "../functions/forms";
import { TextLink } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { Form } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { host_ip } from "../constants/host_ip";
import { TitleLink } from "../components/reusables";
import { userRoles } from "../constants/roles";
import { TransparentButton } from "../components/reusables";
import {useNavigate} from "react-router-dom";

async function loginHandler(e, setSession, navigate){
    e.preventDefault();
    const data = listFromForm(e.target);
    const response = simpleFetch(`${host_ip}/login`, "post", data)   
    response.then(res => res.json())
            .then(res => {
                setSession(new Session(res.worker.rol, res.token, res.worker.nombre));
                navigate(PagePaths['Home']);
            })
            .catch(err => {
                alert("Usuario y/o Contraseña incorrectos.");
                navigate(PagePaths['Login']);
            });
}

function Content() {

    let setSession = useContext(SessionContext).setSession;
    const navigate = useNavigate();

    return (
        <form onSubmit={(e)=>loginHandler(e, setSession, navigate)} class="text-xl flex flex-col">
            <LabeledInput type={"text"} text="Usuario" name="nombre" />
            <LabeledInput type={"password"} text="Contraseña" name="contrasena" />
            <TransparentButton text="Iniciar Sesión" />
            <div class="flex flex-col text-nowrap tm-5 space-y-2">
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
