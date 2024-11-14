export const userRoles = {
    'admin': 'admin',
    'employee': 'employee',
    'client': 'client',
}

export const allRoles = Object.values(userRoles) 
export const libraryRoles = allRoles.filter(role => { return role !== userRoles['client']} );