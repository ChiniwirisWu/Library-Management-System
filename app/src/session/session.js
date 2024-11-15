import { createContext } from "react";
import { userRoles } from "../constants/roles";

class Session {
    constructor(accountType = userRoles['client']) {
        this.accountType = accountType;
    }
    
    getAccountType() {
        return this.accountType;
    }
}

export const SessionContext = createContext(null);

export default Session;