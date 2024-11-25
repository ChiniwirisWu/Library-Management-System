import React, { useContext, useState, useEffect } from "react";
import { MainPage } from "../components/reusables";
import { GetPathTitle } from "../constants/pages";
import { PagePaths } from "../constants/paths";
import { Entry } from "../components/reusables";
import { IconButton } from "../components/reusables";
import { TabButtons } from "../components/reusables";
import AcceptIcon from "res/accept.svg";
import DenyIcon from "res/deny.svg";
import EraseIcon from "res/erase.svg"
import { host_ip } from "../constants/host_ip";
import {fetchEmptyWithAuth} from "../functions/forms";
import sessionContext from "../session/session";
import { listFromObject, translate_roles } from "../functions/objects";

function RequestEntryInfo({ username, isNewAccount = true, isAdminAccount = false }) {

    const accountType = (isAdminAccount) ? "Administrador" : "Trabajador";

    const requestText = (isNewAccount)
        ? `Solicita una cuenta de ${accountType}`
        : "Solicita un cambio de Contraseña";

    return (
        <>
            <h6 className="font-bold">{username}</h6>
            <p className="text-gray-600 font-light">{requestText}</p>
        </>
    );
}

function RequestEntryIcons({handlers}) {
    return (
        <>
            <IconButton src={AcceptIcon} alt="accept" onClickHandler={handlers.acceptHandler} />
            <IconButton src={DenyIcon} alt="deny" onClickHandler={handlers.declineHandler} />
        </>
    );
}

function RequestEntry({ username, isNewAccount = true, isAdminAccount = false, handlers }) {
    return (
        <Entry
            info=<RequestEntryInfo username={username} isNewAccount={isNewAccount} isAdminAccount={isAdminAccount} />
            icons=<RequestEntryIcons handlers={handlers} />
        />
    );
}

function UserEntry({ username, accountType = 'employee', handlers }) {

    const type = (accountType === 'employee') ? "Trabajador" : "Administrador";

    const info = (
        <>
            <h6 className="font-bold">{username}</h6>
            <p className="text-gray-600 font-light">{type}</p>
        </>
    );

    return (
        <Entry
            info={info}
            icons=<IconButton src={EraseIcon} alt="erase" onClickHandler={handlers.deleteHandler} />
        />
    );
}


async function getAllUsers(url, setter, session){
    fetchEmptyWithAuth(url, "get", session.token)
        .then(res=>res.json())
        .then(res=>{
            setter(listFromObject(res, ["nombre", "rol", "cambiar_contrasena"]));
        })
        .catch(err=>console.error(err));
}

async function acceptUserRequest(rol, nombre, setters, session){
    rol = (rol === "employee") ? "Trabajador" : "Administrador";
    if(window.confirm(`Está seguro de validar esta solicitud?`)){
        let response = fetchEmptyWithAuth(`${host_ip}/worker/validateWorker/${nombre}`,"put", session.token)
        .then(res=>res.text())
        .then(res=>{
            getAllUsers(`${host_ip}/workers/requests`, setters.setRequests, session);
            getAllUsers(`${host_ip}/workers/validated`, setters.setUsers, session);
        })
        .catch(err=>console.error(err))
    }
}

async function deleteUser(nombre, mensaje, setters, session){
    if(window.confirm(mensaje)){
        let response = fetchEmptyWithAuth(`${host_ip}/worker/${nombre}`,"delete", session.token)
        .then(res=>res.text())
        .then(res=>{
            getAllUsers(`${host_ip}/workers/validated`, setters.setUsers, session);
            getAllUsers(`${host_ip}/workers/requests`, setters.setRequests, session);
        })
        .catch(err=>console.error(err))
    }
}

async function declinePasswordUpdate(nombre, mensaje, setters, session){
    if(window.confirm(mensaje)){
        let response = fetchEmptyWithAuth(`${host_ip}/worker/declinePasswordUpdate/${nombre}`,"put", session.token)
        .then(res=>res.text())
        .then(res=>{
            getAllUsers(`${host_ip}/workers/validated`, setters.setUsers, session);
            getAllUsers(`${host_ip}/workers/requests`, setters.setRequests, session);
        })
        .catch(err=>console.error(err))
    }
}

function Content() {
    const { session } = useContext(sessionContext);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(()=>{
        getAllUsers(`${host_ip}/workers/validated`, setUsers, session);
        getAllUsers(`${host_ip}/workers/requests`, setRequests, session);
    }, [])


    const tabs = {
        'requests': 'Solicitudes',
        'users': 'Usuarios'
    };

    let [content, setContent] = useState(tabs['requests']);

    function getContent() {

        return (content === tabs['users'])
            ? (users.map(user => <UserEntry handlers={{deleteHandler: ()=> deleteUser(user[0], "Está usted seguro de eliminar ésta solicitud?", {setUsers, setRequests}, session)}} username={user[0]} accountType={user[1]} />))
            : (requests.map(request => <RequestEntry handlers={{acceptHandler: ()=> acceptUserRequest(request[1], request[0], {setUsers, setRequests}, session), declineHandler: (request[2] == 1)? ()=>declinePasswordUpdate(request[0], "Está usted seguro de cancelar esta solicitud de cambio de contraseña?", {setUsers, setRequests}, session) : ()=> deleteUser(request[0], "Está usted seguro de eliminar ésta solicitud?", {setUsers, setRequests}, session)}} username={request[0]} isNewAccount={(request[2] == 1)? false : true} isAdminAccount={request[1] == "admin"} />));
        

    }

    const setRequestsTab = () => { setContent(tabs['requests']); };
    const setUsersTab = () => { setContent(tabs['users']); };

    return (
        <div className="flex flex-col w-[75%] self-center pt-5">
            <TabButtons first_title={tabs['requests']} second_title={tabs['users']} onFirst={setRequestsTab} onSecond={setUsersTab} />
            {getContent()}
        </div>
    );
}

const Users = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Users'])} content=<Content /> />
    );
}

export default Users;
