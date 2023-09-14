const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    };

    getProducts = async () => {
        try {
            if(fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            };
        } catch (error) {
            console.log(error);
        };
    };

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            const products = await this.getProducts();
            
            if(!title||!description||!price||!thumbnail||!code||!stock){
                return console.log('Todos los campos son obligatorios')
            };
            if(products.find((product)=>product.code === code)) {
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
            if (products.length === 0){
                product.id = 1;
            } else {
                product.id = products.length + 1;
            };
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
        } catch (error) {
            console.log(error);
        };
    };
    getProductByid = async (id) => {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === id)
        if (productById){
            return console.log('El producto de id',id ,'es:', productById)
        } else{
            return console.log('Not found')
        };
    };
    updateProduct = async (id, key, value) => {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === id);
        productById[key] = value;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return products;
    };
    deleteProduct = async (id) => {
        const products = await this.getProducts();
        if (id >= 0 && id < products.length) {
            products.splice(id-1, 1);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return products;
    }
};

module.exports = {
    ProductManager
};