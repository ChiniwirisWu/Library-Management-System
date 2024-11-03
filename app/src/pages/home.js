import React from "react";
import { MainPage } from "./components/reusables";
import booksImage from "res/reading-book.png";

function Content({username = "estimado lector"}) {
    return (
        <div className="text-xl flex flex-col h-[100%] w-[100%] items-center content-center place-content-center text-center">
            <img src={booksImage} alt="libro-fantasia" height="225" width="225"></img>
            <p className="text-3xl font-bold">¡Bienvenido, {username}!</p>
        </div>
    );
}

const Home = () => {
    return (
        <MainPage section="Inicio" content=<Content /> />
    );
}

export default Home;