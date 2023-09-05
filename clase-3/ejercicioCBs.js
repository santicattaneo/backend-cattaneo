const suma = (numero1, numero2) => numero1 + numero2;
const resta = (numero1, numero2) => numero1 - numero2;
const multiplicacion = (numero1, numero2) => numero1 * numero2;
const division = (numero1, numero2) => numero1 / numero2;
const realizarOperacion = (numero1, numero2, callback) => {
    const resultado = callback(numero1, numero2);
    console.log(resultado);
};
realizarOperacion(2, 5, suma);
realizarOperacion(2, 5, resta);
realizarOperacion(2, 5, multiplicacion);
realizarOperacion(2, 5, division);