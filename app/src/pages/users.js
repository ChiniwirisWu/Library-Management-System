import React from "react";
import { MainPage } from "./components/reusables";
import { GetPathTitle } from "./constants/pages";
import { PagePaths } from "./constants/paths";
import { Entry } from "./components/reusables";
import { IconButton } from "./components/reusables";
import AcceptIcon from "res/accept.svg";
import DenyIcon from "res/deny.svg";
import EraseIcon from "res/erase.svg"

function RequestEntryInfo({username, isNewAccount = true, isAdminAccount = false}) {

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

function RequestEntryIcons() {
    return (
        <>
            <IconButton src={AcceptIcon} alt="accept" />
            <IconButton src={DenyIcon} alt="deny" />
        </>
    );
}

function RequestEntry({username, isNewAccount = true, isAdminAccount = false}) {
    return (
        <Entry
            info = <RequestEntryInfo username={username} isNewAccount={isNewAccount} isAdminAccount={isAdminAccount} />
            icons = <RequestEntryIcons />
        />
    );
}

function UserEntry({username, accountType = 'Employee'}) {
    
    const type = (accountType === 'Employee') ? "Trabajador" : "Administrador";

    const info = ( 
        <>
            <h6 className="font-bold">{username}</h6>
            <p className="text-gray-600 font-light">{type}</p>
        </>
    );

    return (
        <Entry 
            info = {info}
            icons = <IconButton src={EraseIcon} alt="erase" />
        />
    );
}

function Content() {
    
    const requests = [
        ["Juan David", false, false],
        ["Juliana P.", true, true],
        ["José José", true, false],
    ];

    const users = [
        ["María María"],
        ["MartinezLuis", "Administrador"],
    ]

    requests.push(requests[0]);
    requests.push(requests[0]);
    users.push(users[1]);
    users.push(users[1]);

    
    return (
        <div className="flex flex-col w-[75%] self-center pt-5">
            {requests.map(request => <RequestEntry username={request[0]} isNewAccount={request[1]} isAdminAccount={request[2]} />)}
            {users.map(user => <UserEntry username={user[0]} accountType={user[1]} />)}
        </div>
    );
}

const Users = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Users'])} content=<Content /> />
    );
}

export default Users;