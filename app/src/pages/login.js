import React from "react";
import { TextLink } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { TransparentButton } from "../components/reusables";
import { Form } from "../components/reusables";
import { PagePaths } from "../constants/paths";

function Content() {
    return (
        <div class="text-xl flex flex-col ">
            <LabeledInput type="text" text="Usuario" />
            <LabeledInput type="text" text="Contraseña" />
            <TransparentButton text="Iniciar Sesión" />
            <div class="flex flex-col text-nowrap">
                <TextLink text="¿Olvidó su contraseña?" href={ PagePaths["Password Change"] } />
                <TextLink text="Solicitud de registro" href={ PagePaths["Signup"] } />
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