import React from "react";
import { useContext } from "react";
import SessionContext from "../session/session";
import { Session } from "../session/session";
import { TextLink } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { Form } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { TitleLink } from "../components/reusables";
import { userRoles } from "../constants/roles";

function Content() {

    let setSession = useContext(SessionContext).setSession;

    return (
        <div class="text-xl flex flex-col">
            <LabeledInput type="text" text="Usuario" />
            <LabeledInput type="text" text="Contraseña" />
            <TitleLink text="Iniciar Sesión" path={PagePaths['Home']} onClick={() => { setSession(new Session(userRoles['admin'])) } } />
            <div class="flex flex-col text-nowrap">
                <TextLink text="¿Olvidó su contraseña?" href={PagePaths["Password Change"]} />
                <TextLink text="Solicitud de registro" href={PagePaths["Signup"]} />
            </div>
        </div>
    );
}

const Login = () => {
    return (
        <Form title="Inicio de Sesión" className="max-w-[500px] w-[90%]" content=<Content /> />
    );
}

export default Login;