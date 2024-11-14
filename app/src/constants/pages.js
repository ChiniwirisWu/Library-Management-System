import React from "react";
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Home from "../pages/home";
import Request from "../pages/request";
import Ficha from "../pages/ficha";
import Books from "../pages/books";
import Users from "../pages/users";
import Loans from "../pages/loans";
import { PagePaths } from "./paths";
import { PathNavBarOrder } from "./paths";
import { userRoles } from "./roles";
import { libraryRoles } from "./roles";
import { allRoles } from "./roles";
import { restrictPageTo } from "../functions/permissions";

class Page {
    constructor(path, component, title = null, roles = allRoles) {
        this.path = path;
        this.component = restrictPageTo(component, roles);
        this.title = title;
        this.roles = roles;     
    }
}

export const PagesList = [
    new Page(PagePaths['Welcome'], <Welcome />, "Salir"),
    new Page(PagePaths['Login'], <Login />),
    new Page(PagePaths['Ficha'], <Ficha />, libraryRoles),
    new Page(PagePaths['Home'], <Home />, "Inicio"),
    new Page(PagePaths['Signup'], <Request title= "Solicitud de Registro" />),
    new Page(PagePaths['Password Change'], <Request title= "Solicitud de Cambio de Contraseña" />),
    new Page(PagePaths['Books'], <Books />, "Ver Libros"),
    new Page(PagePaths['Users'], <Users />, "Usuarios", userRoles['admin']),
    new Page(PagePaths['Loans'], <Loans />, "Préstamos", libraryRoles)
];

export const MainPagesList = PagesList
    .filter( page => { 
        return PathNavBarOrder.includes(page.path); 
    })
    .sort((firstPage, nextPage) => {
        return PathNavBarOrder.indexOf(firstPage.path) - PathNavBarOrder.indexOf(nextPage.path);
    });

export function GetPathTitle(path) {
    return MainPagesList.find(page => page.path === path).title;
}