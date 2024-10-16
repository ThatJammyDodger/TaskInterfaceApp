export function API_URL(addend) {
    if (addend == undefined || addend == null)
        addend = "";
    return import.meta.env.VITE_ASP_NET_API_URL + '/api/' + addend;
}   

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}