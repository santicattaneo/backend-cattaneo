import express from 'express';
import ProductManager from "./ProductManager.js";

const app = express();
const manager = new ProductManager('./Products.json');

//ruta '/products' lee y muestra los productos del archivo JSON
app.get('/products', async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const products = await manager.getProducts();
        if (!limit || limit > products.lenght) {
            res.send(products);
        } else {
            const limitProducts = products.filter((p) => p.id <= limit);
            res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
});

//ruta '/products/:pid' recibe id por param y muestra un producto especifico
app.get('/products/:pid', async (req, res) => {
    try {
        const productById =  await manager.getProductByid(Number(req.params.pid));
        res.send(productById);
    } catch (error) {
        console.log(error);
    }
});

app.listen(8080, () => {console.log('Listening on port 8080')});