import React from "react";
import { Form } from "./components/reusables";
import { LabeledInput } from "./components/reusables";
import { TransparentButton } from "./components/reusables";

function Content() {    
    return (
        <div className="text-xl flex flex-col justify-center">
            <LabeledInput text = {"Nombre de Usuario"} />
            <LabeledInput text = {"Contraseña"} />
            <LabeledInput text = {"Repetir Contraseña"} />
            <TransparentButton text="Enviar" />
        </div>
    );
}

const Request = ({title}) => {
    return (
        <Form title={title} className="max-w-[500px] w-[90%]" content = <Content /> />
    );
}

export default Request;