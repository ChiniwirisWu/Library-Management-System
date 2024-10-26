import React from "react";

function LinkH6({text}) {
    return (
        <a href="" class="w-min text-sm underline text-[#303F9F] hover:text-blue-300 transition-all mb-2"><h6>{text}</h6></a>
    );
}

function LinksContainer() {
    return (
        <div class="flex flex-col text-nowrap">
            <LinkH6 text="¿Olvidó su contraseña?"/>
            <LinkH6 text="Solicitud de registro"/>
        </div>
    );
}

function Input({text},{type}) {
    return (
        <div className="flex flex-col">
            <label for="user" class="text-lg mb-2">{text}</label>
            <input type={type} name="user" id="user" class="text-base p-2 border-b-2 border-b-[#303F9F] mb-8 focus:outline-none focus:border-b-blue-300 transition-colors duration-300"/>
        </div>
    );
}

function TransparentButton({text}) {
    return (
        <button class="border-1 rounded-md text-[#303F9F] hover:text-blue-300 transition-all mb-4 w-min text-nowrap m-auto">{text}</button>

    );
}
function InputContainer() {
    return (
        <div class="flex flex-col">
            <Input type="text" text="Usuario: "/>
            <Input type="text" text="Contrasena: "/>
        </div>
    );
}

const Login = () => {
  return (
    <div class="w-[100%] h-[100%] flex bg-[#f2f2f2] border-t-[30px] border-[#303F9F] ">
        <div class="max-w-[500px] w-[90%] h- p-[40px] m-auto bg-white rounded-sm shadow-sm shadow-[grey]">
            <header class="mb-6">
                <h1 class="text-center font-thin text-3xl">Inicio de Sesión</h1>
            </header>

            <section class="text-xl flex flex-col ">
                <InputContainer />
                <TransparentButton text="Iniciar Sesión" />
                <LinksContainer />
            </section>
        </div>
    </div>
  );
}

export default Login;