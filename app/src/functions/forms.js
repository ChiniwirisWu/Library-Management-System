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


export function fetchWithAuthorization(url, method, data = {}, token){
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
