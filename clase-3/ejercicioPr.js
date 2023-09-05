const suma = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) reject('Operacion innecesaria');
        if (num1 + num2 < 0) reject('La calculadora solo debe retornar valores positivos');
        resolve(num1 + num2)
    });
};
const resta = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) reject('Operacion innecesaria');
        if (num1 - num2 < 0) reject('La calculadora solo debe retornar valores positivos');
        resolve(num1 - num2)
    });
};
const multiplicacion = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 < 0 || num2 < 0) reject('La calculadora solo debe retornar valores positivos');
        resolve(num1 * num2)
    });
};
const division = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num2 === 0) reject('No se puede dividir entre cero');
        resolve(num1 / num2)
    });
};
const calculos = async () => {
    try {
        const num1 = 5;
        const num2 = 2;
        console.log(await suma(num1, num2));
        console.log(await resta(num1, num2));
        console.log(await multiplicacion(num1, num2));
        console.log(await division(num1, num2));
    } catch (error) {
        console.log(error);
    };
};
calculos();