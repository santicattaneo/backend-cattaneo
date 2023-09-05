//trim
const cadena1 = '     hola';
const cadena2 = cadena1.trim();
console.log('cadena 1: ', cadena1, 'length: ', cadena1.length)
console.log('cadena 2: ', cadena2, 'length: ', cadena2.length)
//flat
const arregloAnidado = [[1, 2], [3, 4], [5, 6]];
const arregloProcesado = arregloAnidado.flat();
console.log('arreglo anidado: ', arregloAnidado, ', arreglo procesado: ', arregloProcesado);
//nullish operator
const prueba = 0;
const defaultVar = prueba || 'Sin valor';
const nullish = prueba ?? 'Sin valor';
console.log('default: ', defaultVar, ', nullish: ', nullish);