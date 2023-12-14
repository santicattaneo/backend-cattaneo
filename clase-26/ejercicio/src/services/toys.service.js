import Toys from '../dao/memoryManager/toys.manager.js';

const toysManager = new Toys();

const getToys = async () => {
    const toys = toysManager.getAll();

    // Lógica de negocio
    //
    //

    return toys;
};

const saveToy = async (toy) => {
    await toysManager.save(toy);

    // Lógica de negocio
    //
    //

    return toy;
};

export{
    getToys,
    saveToy
};