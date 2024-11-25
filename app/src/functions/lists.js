export function setSearchableStrings(books = []){
    const ignorables = ['ca', 'edicion', 'ejemplares', 'esReferencia', 'volumen', 'coleccion'];
    for (let i = 0; i < books.length; i++){
        let searchableString = ''; 
        for (const property in books[i]){
            if(ignorables.includes(property)) continue;
            searchableString += `${books[i][property]} `;
        }
        books[i].searchableString = searchableString.toLowerCase();
    }
    return books;
}
