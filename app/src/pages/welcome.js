import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./components/reusables";

export function Title() {
    return (
        <header className="h-[125px] flex items-end place-content-center">
            <h1 className="text-3xl text-center font-thin">
                Biblioteca Pública
                <br></br>
                Juan Temístocles Maza
            </h1>
        </header>
    );
}

function ButtonsWrapper() {
    return (
        <section className="h-[175px] w-[100%] flex items-center place-content-evenly">
            <Link className="w-[25%] h-[30%]" to="/login">
                <PrimaryButton title={"Trabajador"} />
            </Link>
            <Link className="w-[25%] h-[30%]" to="/ficha">
                <PrimaryButton title={"Cliente"} />
            </Link>
        </section>
    );
}

const BackgroundLibraryImage = ({ content }) => {
    return (
        <div className="App min-h-[100%] flex flex-col justify-center bg-[url(../res/library-background.jpg)] bg-cover">
            {content}
        </div>
    );
}

function Content() {
    return (
        <div className="max-w-[75%] w-[500px] h-[300px] mx-auto flex flex-col bg-white rounded-[12px] ">
            <Title />
            <ButtonsWrapper />
        </div>
    );
}

const Welcome = () => {
    return (
        <BackgroundLibraryImage content=<Content /> />
    );
}

export default Welcome;