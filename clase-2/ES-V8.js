const objeto1 = {
    impuesto1: 12,
    impuesto2: 24,
    impuesto3: 36
};
//object metodos
const soloPropiedades = Object.keys(objeto1);
console.log('keys: ', soloPropiedades)
const soloValores = Object.values(objeto1);
console.log('values: ', soloValores)
const soloEntradas = Object.entries(objeto1);
console.log('entries: ', soloEntradas)
//reduce
const impuestosTotales = soloValores.reduce((valorInicial, valorAcumulado) => valorAcumulado + valorInicial)
console.log('impuestos totales: ', impuestosTotales)