const objeto1 = {
    prop1: 1,
    prop2: 'a'
}
const objeto2 = {
    prop3: true,
    prop4: [1, 2, 3, 4]
}
//spread - destructuring
const {prop1, prop2} = objeto1;
console.log('propiedad 1: ', prop1, ', propiedad 2: ', prop2);
const objetoResultante = { ...objeto1, ...objeto2 };
console.log('objeto resultante: ', objetoResultante);
//rest
const { prop1: prop1Rename, ...result} = objeto1;
console.log('propiedad renombrada: ', prop1Rename, 'result: ', result);