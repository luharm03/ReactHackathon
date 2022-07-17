export function setType(data) {
    localStorage.setItem("gtype", JSON.stringify(data))
}
export function getType(l) {
    let data = localStorage.getItem("gtype")
    if (data == null) {
        data = {};
        localStorage.setItem("gtype", JSON.stringify(data))
    }
    return typeof data === 'string'? JSON.parse(data) : data;
}

export function resetType() {
    localStorage.setItem("gtype", JSON.stringify({}))
}