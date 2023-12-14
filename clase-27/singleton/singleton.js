import mongoose from 'mongoose';

export default class MongoSingleton {
    static #instance;
    
    constructor () {
        mongoose.connect('string-de-conexion');
    };

    static getInstance() {
        //si la instancia de la clase no existe la creamos
        //en caso contrario reutilizamos
        if(this.#instance) {
            console.log('la conexion ya existe');
            return this.#instance
        };
        console.log('la conexion no existe');
        this.#instance = new MongoSingleton();
        return this.#instance;
    };
};