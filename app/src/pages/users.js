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

function Content() {
    const { session } = useContext(sessionContext);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);

    async function getAllUsers(url, handler){
        fetchEmptyWithAuth(url, "get", session.token)
            .then(res=>res.json())
            .then(res=>{
                console.log(listFromObject(res, ["nombre", "rol"]))
                handler(listFromObject(res, ["nombre", "rol"]));
            })
            .catch(err=>console.error(err));
    }

    async function acceptUserRequest(rol, nombre){
        rol = (rol === "employee") ? "Trabajador" : "Administrador";
        if(window.confirm(`Está seguro de validar éste usuario como ${rol}?`)){
            let response = fetchEmptyWithAuth(`${host_ip}/worker/validateWorker/${nombre}`,"put", session.token)
            .then(res=>res.text())
            .then(res=>{
                getAllUsers(`${host_ip}/workers/requests`, setRequests);
                getAllUsers(`${host_ip}/workers/validated`, setUsers);
            })
            .catch(err=>console.error(err))
        }
    }

    async function deleteUser(nombre, mensaje){
        if(window.confirm(mensaje)){
            let response = fetchEmptyWithAuth(`${host_ip}/worker/${nombre}`,"delete", session.token)
            .then(res=>res.text())
            .then(res=>{
                getAllUsers(`${host_ip}/workers/validated`, setUsers);
                getAllUsers(`${host_ip}/workers/requests`, setRequests);
            })
            .catch(err=>console.error(err))
        }
    }

    useEffect(()=>{
        getAllUsers(`${host_ip}/workers/validated`, setUsers);
        getAllUsers(`${host_ip}/workers/requests`, setRequests);
    }, [])


    const tabs = {
        'requests': 'Solicitudes',
        'users': 'Usuarios'
    };

    let [content, setContent] = useState(tabs['requests']);

    function getContent() {

        return (content === tabs['users'])
            ? (users.map(user => <UserEntry handlers={{deleteHandler: ()=> deleteUser(user[0], "Está usted seguro de eliminar ésta solicitud?")}} username={user[0]} accountType={user[1]} />))
            : (requests.map(request => <RequestEntry handlers={{acceptHandler: ()=> acceptUserRequest(request[1], request[0]), declineHandler: ()=> deleteUser(request[0], "Está usted seguro de eliminar ésta solicitud?")}} username={request[0]} isNewAccount={true} isAdminAccount={request[1] == "admin"} />));

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
