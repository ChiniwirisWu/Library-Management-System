import React from "react";
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Home from "../pages/home";
import Request, { request_types } from "../pages/request";
import Books from "../pages/books";
import Users from "../pages/users";
import Loans from "../pages/loans";
import { PagePaths } from "./paths";
import { PathNavBarOrder } from "./paths";
import { userRoles } from "./roles";
import { libraryRoles } from "./roles";
import { allRoles } from "./roles";
import { RestrictedPage } from "../functions/permissions";
import Record from "../pages/record";
import { record_types } from "../pages/record";
import LoanRequest, { loan_types } from "../pages/loanRequest";

class Page {
    constructor(path, component, title = null, roles = allRoles) {
        this.path = path;
        this.component = <RestrictedPage page={component} permissions={roles} />;
        this.title = title;
        this.roles = roles;     
    }
}

export const PagesList = [
    new Page(PagePaths['Welcome'], <Welcome />, "Salir"),
    new Page(PagePaths['Login'], <Login />),
    new Page(PagePaths['CreateRecord'], <Record record_type={record_types['new']} />, "", libraryRoles),
    new Page(PagePaths['ReadRecord'], <Record record_type={record_types['info']} />),
    new Page(PagePaths['ModifyRecord'], <Record record_type={record_types['modify']} />, "", libraryRoles),
    new Page(PagePaths['Home'], <Home />, "Inicio"),
    new Page(PagePaths['Signup'], <Request request_type={request_types['register']} title= "Solicitud de Registro" />),
    new Page(PagePaths['Password Change'], <Request request_type={request_types['change_password']} title= "Solicitud de Cambio de Contraseña" />),
    new Page(PagePaths['Books'], <Books />, "Ver Libros"),
    new Page(PagePaths['Users'], <Users />, "Usuarios", userRoles['admin']),
    new Page(PagePaths['Loans'], <Loans />, "Préstamos", libraryRoles),
    new Page(PagePaths['LoanRequest'], <LoanRequest loan_type={ loan_types['new'] } />, "", libraryRoles),
    new Page(PagePaths['LoanInfo'], <LoanRequest loan_type={ loan_types['info'] } />, "", libraryRoles)
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
