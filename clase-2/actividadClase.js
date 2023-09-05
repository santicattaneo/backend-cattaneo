const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2 
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]
//realizar una lista nueva que contenga los tipos de productos
//obtener el total de productos vendidos
let prodsTypes = [];
let total = 0;
objetos.forEach((objeto)=>{
    const keys = Object.keys(objeto);
    const values = Object.values(objeto);
    total += values.reduce((valorInicial, valorAcumulado) => valorAcumulado + valorInicial);
    keys.forEach((key) => {
        if(!prodsTypes.includes(key)){prodsTypes.push(key)}
    })
})
console.log('tipos: ', prodsTypes, ', total: ', total);