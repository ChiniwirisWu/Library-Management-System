import React from "react";
import Welcome from "../welcome";
import Login from "../login";
import Home from "../home";
import Request from "../request";
import Ficha from "../ficha";

export const userRoles = {
    'admin': 'admin',
    'employee': 'employee',
    'client': 'client',
}

export const pagePath = {
    'Welcome': '/',
    'Login': '/inicio-de-sesion',
    'Ficha': '/agregar-ficha',
    'Home': '/inicio',
    'Signup': '/solicitud-registro',
    'Password Change': 'solicitud-contrasena',
};

const pathNavBarOrder = [pagePath['Home'], pagePath['Ficha'], pagePath['Welcome']]

export const allRoles = Object.values(userRoles) 
export const libraryRoles = allRoles.filter(role => { return role !== userRoles['client']} );

class Page {
    constructor(path, component, title = null, roles = allRoles) {
        this.path = path;
        this.component = component;
        this.roles = roles;        
    }
}

export const PagesList = [
    new Page(pagePath['Welcome'], <Welcome />, "Salir"),
    new Page(pagePath['Login'], <Login />),
    new Page(pagePath['Ficha'], <Ficha />, "Añadir Ficha", libraryRoles),
    new Page(pagePath['Home'], <Home />, "Inicio"),
    new Page(pagePath['Signup'], <Request title= "Solicitud de Registro" />),
    new Page(pagePath['Password Change'], <Request title= "Solicitud de Cambio de Contraseña" />)
];

const MainPagesArray = PagesList.filter( page => {
    return  page.path === pagePath['Welcome'] 
    ||      page.path === pagePath['Ficha']
    ||      page.path === pagePath['Home']
});

export const MainPagesList = MainPagesArray.sort((firstPage, nextPage) => {
    return pathNavBarOrder.indexOf(firstPage.path) - pathNavBarOrder.indexOf(nextPage.path);
})