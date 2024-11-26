import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { useContext } from "react";
import SessionContext from "../session/session";
import { Session } from "../session/session";

export function Title() {
    return (
        <h1 className="text-xl sm:text-3xl text-center font-thin">
                Biblioteca Pública
                Juan Temístocles Maza
        </h1>
    );
}

function ButtonsWrapper() {

    let setSession = useContext(SessionContext).setSession;

    return (
        <section className="h-[70%] w-[100%] max-x-[500px] flex space-x-10 items-center place-content-center self-center">
            <div className="h-[35%] w-[50%] sm:w-[35%]">
                <PrimaryButton title={"Trabajador"} path={PagePaths['Login']}/> 
            </div>
            <div className="h-[35%] w-[50%] sm:w-[35%]">
                <PrimaryButton title={"Lector"} path={PagePaths['Home']} onClick={() => { setSession(new Session()) } } />
            </div>
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
        <div className="px-10 py-10 max-w-[75%] w-[500px] h-[300px] mx-auto flex flex-col bg-white rounded-[12px] ">
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