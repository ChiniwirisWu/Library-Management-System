import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { userRoles } from "../constants/roles";

export class Session {
    constructor(accountType = userRoles['client']) {
        this.accountType = accountType;
    }
    
    getAccountType() {
        return this.accountType;
    }
}

const SessionContext = createContext(new Session());

export const ContextWrapper = ({content}) => {
    const [session, setSession] = useState(new Session(userRoles['admin']));
    
    return(
        <SessionContext.Provider value={{session, setSession}}>
            {content}
        </SessionContext.Provider>
    );
};

export default SessionContext;