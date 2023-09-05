class ProductManager {
    constructor() {
        this.products = [];
    };
    getProducts = () => {
        return this.products
    };
    addProduct = (title, description, price, thumbnail, code, stock) => {
        if(!title||!description||!price||!thumbnail||!code||!stock){
            return console.log('Todos los campos son obligatorios')
        };
        if(this.products.find((product)=>product.code === code)) {
            return console.log('El codigo esta asociado a otro producto')
        }
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        if (this.products.length === 0){
            product.id = 1;
        } else {
            product.id = this.products.length + 1;
        };
        this.products.push(product);
    };
    getProductByid = (id) => {
        const productIndex = this.products.find((product) => product.id === id)
        if (productIndex){
            return console.log('El producto de id',id ,'es:', productIndex)
        } else{
            return console.log('Not found')
        };
    };
};
//creamos instancia de la clase
const manejadorProducts = new ProductManager();

//creamos elementos
//completos y correctos
manejadorProducts.addProduct('Pizza', 'Pizza de rucula', 2500, 'img.com/piza-rucula', 'P-001', 5);
manejadorProducts.addProduct('Hamburguesa', 'Hamburguesa americana', 3000, 'img.com/hamburguesa-americana', 'P-002', 2);
//completo con code repetido
manejadorProducts.addProduct('Empanada', 'Empanada jyq', 500, 'img.com/empanada-jyq', 'P-001', 48);
//incompleto
manejadorProducts.addProduct('Lomo', 'Lomo completo', 3000, 'img.com/lomo-completo', 'P-003');

//buscamos por id
manejadorProducts.getProductByid(1);
manejadorProducts.getProductByid(3);

//mostramos los productos
console.log('productos: ', manejadorProducts.getProducts())