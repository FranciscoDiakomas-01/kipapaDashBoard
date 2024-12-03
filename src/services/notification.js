
export function Notify( value) {
    const totalPedidos = localStorage.getItem("totalPedidos")
    if (totalPedidos == null || totalPedidos == undefined) {
        localStorage.setItem("totalPedidos", value);
        console.log("cant")
        return false
    } else {
        //verificar se o valor passado são iguais
        if (totalPedidos != value) {
            console.log("can");
            localStorage.setItem("totalPedidos", value);
            return true
        } else {
            localStorage.setItem("totalPedidos", value);
        console.log("cant");
            return false
        }
    }
}