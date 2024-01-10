// const suma = (num1, num2) => {
//     if(!num1 || !num2) return 0;
//     if(typeof num1 !== 'number' || typeof num2 !== 'number') return null;
//     const result = num1 + num2;
//     return result;
// };

// const suma = (...numeros) => {
//     let resultado = 0;
//     if(numeros.length === 0) return 0;
//     for(let i=0; i < numeros.length; i++) {
//         if(typeof numeros[i] !== 'number') {
//             return null;
//         }
//         resultado += numeros[i];
//     };
//     return resultado;
// };

const suma = (...numeros) => {
    if(numeros.length === 0) return 0;
    if(!numeros.every((numero) => numero === 'number')) return null;
    return numeros.reduce((a, b) => a + b);
};

//CRITERIOS
//1. La funcion debe devolcer null si algun parametro no es numerico
//2. La funcion debe devolcer 0 si no se paso ningun parametro
//3. La funcion debe poder realizar la suma correctamente
//4. La funcion debe poder hacer la suma con cualquier cantidad de numeros

let testPasados = 0;
let testTotales = 4;

//Caso 1
const resultado1 = suma('2', 2);

if(resultado1 === null) {
    console.log('Test 1: Correcto');
    testPasados++;
} else {
    console.log(`Test 1: Incorrecto: Se recibio ${typeof resultado1} y se esperaba null`);
};

//Caso 2
const resultado2 = suma();

if(resultado2 === 0) {
    console.log('Test 2: Correcto');
    testPasados++;
} else {
    console.log(`Test 2: Incorrecto: Se recibio ${resultado2} y se esperaba 0 (cero)`);
};

//Caso 3
const resultado3 = suma(2, 4);

if(resultado3 === 6) {
    console.log('Test 3: Correcto');
    testPasados++;
} else {
    console.log(`Test 3: Incorrecto: Se recibio ${resultado3} y se esperaba 6 (seis)`);
};

//Caso 4
const resultado4 = suma(3, 4, 5, 6);

if(resultado4 === 18) {
    console.log('Test 4: Correcto');
    testPasados++;
} else {
    console.log(`Test 4: Incorrecto: Se recibio ${resultado4} y se esperaba 18 (diesiocho)`);
};

if(testPasados === testTotales) console.log('Pruebas pasadas exitosamente');
else console.log(`Se pasaron ${testPasados} tests de un total de ${testTotales}`);