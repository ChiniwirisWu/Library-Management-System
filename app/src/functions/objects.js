export function listFromObject(list, keys){
    const result = [];
    for (const row of list){
        const new_row = [];
        for (const key of keys){
            new_row.push(row[key]);
        }
        result.push(new_row);
    }
    return result;
}

export function translate_roles(list){
    for (let i = 0; i < list.length; i++){
        for (let j = 0; j < list[i].length; j++){
           if(list[i][j] == "admin") list[i][j] = "Administrador"; 
           if(list[i][j] == "employee") list[i][j] = "Trabajador"; 
        }
    }
    return list;
}

export function default_with_zero(data, properties){
    for(const property in data){
        if(data[property] == "" && properties.includes(property)){
            data[property] = 0
        }
    }
    return data;
}

export function default_with_string(data, properties){
    for(const property in data){
        if(data[property] == 0 && properties.includes(property)){
            data[property] = ""
        }
    }
    return data;
}

export function is_fields_empty(data, exceptions){
    for (const row in data){
        if(exceptions.includes(row)) continue;
        if(data[row] == ""){
            return true;
        }
    }
    return false;
}
