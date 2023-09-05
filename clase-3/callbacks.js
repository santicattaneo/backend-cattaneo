const numeros = [1, 2, 3, 4, 5];
const numerosMap = numeros.map((num)=>num+1)
console.log(numerosMap);
const functionCallBack = (valor) => {
    if (valor % 2 === 0){
        return valor;
    } else {
        return 'no es par';
    };
};
const valoresPares = numeros.map(functionCallBack);
console.log(valoresPares);

//construir map
const miMap = (arreglo, callback) => {
    const nuevoArreglo = [];
    for (let i=0; i<arreglo.length; i++) {
        const nuevoValor = callback(arreglo[i]);
        nuevoArreglo.push(nuevoValor);
    };
    return nuevoArreglo;
};
const resultadoMiMap = miMap(numeros, x => x*2);
console.log(resultadoMiMap);