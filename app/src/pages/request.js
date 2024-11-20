import React from "react";
import { Form } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { TransparentButton } from "../components/reusables";
import { host } from "../constants/host_ip";
import { listFromForm, simpleFetch } from "../functions/forms";
import {useNavigate} from "react-router-dom";

async function requestHandler(e, navigate){
    e.preventDefault();
    const data = await listFromForm(e);
    if(data.contrasena == data.contrasena_repetida){
        const response = simpleFetch(`${host}/register`, "post", data);
        response.then(res=>res.text())
                .then(res=>console.log(res))
                .catch(err => console.error(err));
    } else{
        console.log("Las contrasenas no son iguales");
    }
}

function Content() {
    const navigate = useNavigate();

    return (
        <form onSubmit={(e)=> requestHandler(e, navigate)} className="text-xl flex flex-col justify-center my-auto">
            <LabeledInput text={"Nombre de Usuario"} name="nombre" />
            <LabeledInput text={"Contraseña"} name="contrasena" />
            <LabeledInput text={"Repetir Contraseña"} name="contrasena_repetida" />
            <TransparentButton text="Enviar" />
        </form>
    );
}

const Request = ({ title }) => {
    return (
        <Form title={title} className="max-w-[500px] w-[90%]" content=<Content /> />
    );
}

export default Request;
