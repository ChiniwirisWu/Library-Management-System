import React from "react";
import { MainPage } from "./components/reusables";
import { GetPathTitle } from "./constants/pages";
import { PagePaths } from "./constants/paths";

function Content() {
    return (
        <div className="text-xl flex flex-col h-[100%] w-[100%] items-center content-center place-content-center text-center">
            <p className="text-3xl font-bold">¡Hola, Coca-cola!</p>
        </div>
    );
}

const Users = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Users'])} content=<Content /> />
    );
}

export default Users;