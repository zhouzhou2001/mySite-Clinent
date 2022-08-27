export default function (timestmap, times = false) {
    const date = new Date(+timestmap);
    const mouth = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    if (times) {
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const second = date.getSeconds().toString().padStart(2, "0");
        return `${date.getFullYear()}-${mouth}-${day} ${hour}:${minute}:${second}`;
    }
    return `${date.getFullYear()}-${mouth}-${day}`;
}
