import React from "react";
import { Form } from "../components/reusables";
import { LabeledInput } from "../components/reusables";
import { TransparentButton } from "../components/reusables";
import { host_ip } from "../constants/host_ip";
import { listFromForm, simpleFetch } from "../functions/forms";
import {useNavigate} from "react-router-dom";

export const request_types = {
    'register': 'register',
    'change_password': 'change_password'
}

async function requestHandler(url, e, navigate, method){
    e.preventDefault();
    const data = await listFromForm(e.target);
    if(data.contrasena == data.contrasena_repetida){
        const response = simpleFetch(url, method, data);
        response.then(res=>res.text())
                .then(res=>alert(res))
                .catch(err => {
                    alert(err);
                    navigate('Login');
                });
    } else{
        alert("Las contraseñas no son iguales")
    }
}

function Content({request_type}) {
    const navigate = useNavigate();
    const url = (request_type == request_types['register']) ? `${host_ip}/register` : `${host_ip}/worker/updateReplacementPassword`;
    const method = (request_type == request_types['register']) ? "post" : "put";

    return (
        <form onSubmit={(e)=> requestHandler(url, e, navigate, method)} className="text-xl flex flex-col justify-center my-auto">
            <LabeledInput text={"Nombre de Usuario"} name="nombre" />
            <LabeledInput text={"Contraseña"} name="contrasena" />
            <LabeledInput text={"Repetir Contraseña"} name="contrasena_repetida" />
            <TransparentButton text="Enviar" />
        </form>
    );
}

const Request = ({ title, request_type }) => {
    return (
        <Form title={title} className="max-w-[500px] w-[90%]" content=<Content request_type={request_type} /> />
    );
}

export default Request;
