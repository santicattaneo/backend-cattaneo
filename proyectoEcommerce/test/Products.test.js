import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080/');

describe('Pruebas de integracion modulo de products', () => {
    it('GET de /api/products. Debe devolver el array de productos', async () => {
        const { statusCode, _body } = await requester.get('api/products');
        expect(statusCode).to.be.eql(200);
        expect(typeof _body.payload).to.be.eql('array');
    });
    it('POST de /api/products. Debe crear un producto', async () => {
        const mockProduct = {
            title: 'Product Title',
            description: 'Product Description',
            code: '1234',
            price: 1234,
            stock: 1,
            category: 'Product Category'
        };
        const { statusCode, _body } = await requester.post('api/products').send(mockProduct);
        expect(statusCode).to.be(201);
        expect(_body.message).to.be.eql('product created');
    });
    it('DELETE de /api/products/:pid. Debe eliminar un producto por su id', async () => {
        const response = await requester.get('api/products')
        const id = response._body.payload.id
        const { statusCode, _body } = await requester.delete(`api/products/${id}`);
        expect(statusCode).to.be(201);
        expect(_body.message).to.be.eql('product deleted');
    });
});