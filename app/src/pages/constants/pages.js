import React from "react";
import Welcome from "../welcome";
import Login from "../login";
import Home from "../home";
import Request from "../request";
import Ficha from "../ficha";
import { PagePaths } from "./paths";
import { PathNavBarOrder } from "./paths";

export const userRoles = {
    'admin': 'admin',
    'employee': 'employee',
    'client': 'client',
}

export const allRoles = Object.values(userRoles) 
export const libraryRoles = allRoles.filter(role => { return role !== userRoles['client']} );

class Page {
    constructor(path, component, title = null, roles = allRoles) {
        this.path = path;
        this.component = component;
        this.title = title;
        this.roles = roles;     
    }
}

export const PagesList = [
    new Page(PagePaths['Welcome'], <Welcome />, "Salir"),
    new Page(PagePaths['Login'], <Login />),
    new Page(PagePaths['Ficha'], <Ficha />, "Añadir Ficha", libraryRoles),
    new Page(PagePaths['Home'], <Home />, "Inicio"),
    new Page(PagePaths['Signup'], <Request title= "Solicitud de Registro" />),
    new Page(PagePaths['Password Change'], <Request title= "Solicitud de Cambio de Contraseña" />)
];

const MainPagesArray = PagesList.filter( page => {
    return  page.path === PagePaths['Welcome'] 
    ||      page.path === PagePaths['Ficha']
    ||      page.path === PagePaths['Home']
});

export const MainPagesList = MainPagesArray.sort((firstPage, nextPage) => {
    return PathNavBarOrder.indexOf(firstPage.path) - PathNavBarOrder.indexOf(nextPage.path);
})

export function GetPathTitle(path) {
    return MainPagesList.find(page => page.path === path).title;
}