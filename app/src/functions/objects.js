export function listFromObject(list, keys){
    console.log(list)
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
