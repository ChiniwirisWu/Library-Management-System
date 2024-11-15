import React from "react";
import { useContext } from "react";
import SessionContext from "../session/session";

export const RestrictedComponent = ({ component, permissions }) => {

    let session = useContext(SessionContext).session;

    return (permissions.includes(session.getAccountType())) ? component : null;
}

export const RestrictedPage = ({ page, permissions = 'users' }) => {

    let session = useContext(SessionContext).session;

    return (permissions.includes(session.getAccountType())) ? page : (
        <div className="h-[100%] w-[100%] px-[50px] place-content-center flex-col bg-gray-200 items-center">
            <h1 className="text-7xl text-center font-bold">
                Usted No Tiene Permiso para Acceder a esta Página
            </h1>
        </div>
    );
}