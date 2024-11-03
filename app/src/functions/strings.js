export function limitString(string, size) {
    return (string.length < size) 
        ? string 
        : string.substring(0, size - 2).trim().concat("...");
}