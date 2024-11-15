import React from "react";
import { userRoles } from "../constants/roles";

export function restrictTo(component, permissions, accountType = userRoles['client']) {
    return (permissions.includes(accountType))
        ? component 
        : null;
}

export function restrictPageTo(component, permissions, accountType = userRoles['client']) {
    return (permissions.includes(accountType)) 
        ? component 
        : (
            <div className="h-[100%] w-[100%] px-[50px] place-content-center flex-col bg-gray-200 items-center">
                <h1 className="text-7xl text-center font-bold">
                    Usted No Tiene Permiso para Acceder a esta Página
                </h1>
            </div>
);}