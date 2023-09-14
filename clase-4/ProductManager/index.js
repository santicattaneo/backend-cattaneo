const { ProductManager } = require('./manager/ProductManager');
const manager = new ProductManager('./files/Products.json');
const env = async () => {
    const products = await manager.getProducts();
    console.log(products);

    //creamos elementos
    //completos y correctos
    await manager.addProduct('Pizza', 'Pizza de rucula', 2500, 'img.com/piza-rucula', 'P-001', 5);
    await manager.addProduct('Hamburguesa', 'Hamburguesa americana', 3000, 'img.com/hamburguesa-americana', 'P-002', 2);
    //completo con code repetido
    await manager.addProduct('Empanada', 'Empanada jyq', 500, 'img.com/empanada-jyq', 'P-001', 48);
    //incompleto
    await manager.addProduct('Lomo', 'Lomo completo', 3000, 'img.com/lomo-completo', 'P-003');

    //mostramos productos agregados
    const productsAggs = await manager.getProducts();
    console.log(productsAggs)

    //buscamos por id
    //encuentra
    await manager.getProductByid(2);
    //no encuentra
    await manager.getProductByid(5);

    //borramos un producto
    const deleteProduct = await manager.deleteProduct(1);
    console.log(deleteProduct)
    
    //actualizamos un producto
    const updateProduct = await manager.updateProduct(2, 'price', 3500);
    console.log(updateProduct)
};

env();