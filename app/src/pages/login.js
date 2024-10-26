import React from "react";
import { TextLink } from "./components/reusables";
import { LabeledInput } from "./components/reusables";
import { TransparentButton } from "./components/reusables";
import { FormBackground } from "./components/reusables";

function LinksContainer() {
    return (
        <div class="flex flex-col text-nowrap">
            <TextLink text="¿Olvidó su contraseña?" />
            <TextLink text="Solicitud de registro" />
        </div>
    );
}

function InputsContainer() {
    return (
        <div class="flex flex-col">
            <LabeledInput type="text" text="Usuario: " />
            <LabeledInput type="text" text="Contrasena: " />
        </div>
    );
}

function Title() {
    return(
        <header class="mb-6">
            <h1 class="text-center font-thin text-3xl">Inicio de Sesión</h1>
        </header>
    );
}

function FormContent() {
    return(
        <section class="text-xl flex flex-col ">
                    <InputsContainer />
                    <TransparentButton text="Iniciar Sesión" />
                    <LinksContainer />
                </section>
    );
}

function Form() {
    return (
        <div class="max-w-[500px] w-[90%] h- p-[40px] m-auto bg-white rounded-sm shadow-sm shadow-[grey]">    
            <Title />
            <FormContent />
        </div>
    );
}

const Login = () => {
    return (
        <FormBackground content=<Form /> />
    );
}

export default Login;