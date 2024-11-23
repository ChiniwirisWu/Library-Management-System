export function listFromForm(form){
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    return data;
} 

export function simpleFetch(url, method, data = {}){
    let response = fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
    });
    return response;
}

export function fetchEmptyWithAuth(url, method="get", token){
    let response = fetch(url, {
        method,
        headers: { "Authorization": token }
    })
    return response;
}


export function fetchWithAuth(url, method="get", data = {}, token){
    let response = fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json",
            "Authorization": token
        }
    });
    return response;
}


