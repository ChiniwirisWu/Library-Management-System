export function listFromForm(e){
    const form = e.target;
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

