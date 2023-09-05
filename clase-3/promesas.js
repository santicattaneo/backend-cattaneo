const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if (divisor === 0){
            reject('No se puede hacer divisiones entre cero')
        } else {
            resolve(dividendo/divisor);
        };
    });
};

//promesa sincronica
//dividir(10, 2)
//.then((resultado) => {
//    console.log(resultado)
//})
//.catch((error) => { console.log(error) })

//promesa asincronica
const funcionAsincrona = async () => {
    //resolve
    try {
        const resultado = await dividir(10, 2);
        console.log(resultado);
    } 
    //reject
    catch (error) {
        console.log(error);
    };
};
funcionAsincrona();