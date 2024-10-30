import React from "react";
import { TextLink } from "./components/reusables";
import { LabeledInput } from "./components/reusables";
import { TransparentButton } from "./components/reusables";
import { Form } from "./components/reusables";

function Content() {
    return (
        <div class="text-xl flex flex-col ">
            <LabeledInput type="text" text="Usuario" />
            <LabeledInput type="text" text="Contrasena" />
            <TransparentButton text="Iniciar Sesión" />
            <div class="flex flex-col text-nowrap">
                <TextLink text="¿Olvidó su contraseña?" href="/" />
                <TextLink text="Solicitud de registro" href="/signup" />
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