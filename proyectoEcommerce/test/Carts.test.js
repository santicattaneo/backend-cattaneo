import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080/');

describe('Pruebas de integracion modulo de carts', () => {
    it('GET de /api/carts/:cid. Debe devolver un carrito por su ID', async () => {
        const mockCart = {
            products: []
        };
        const response = await requester.post('/api/carts').send(mockCart);
        const id = response._body.payload.id;
        const { statusCode, _body } = await requester.get(`/api/carts/${id}`);
        expect(statusCode).to.be(200);
        expect(typeof _body.payload).to.be.eql('object');
    });
    it('POST de /api/carts/. Debe crear un carrito', async () => {
        const mockCart = {
            products: []
        };
        const { statusCode, _body } = await requester.post(`/api/carts/`).send(mockCart);
        expect(statusCode).to.be(201);
        expect(typeof _body.payload).to.be.eql('object');
    });
    it('GET de /api/carts/:cid/purchase. Debe crear el ticket de compra', async () => {
        const mockCart = {
            products: []
        };
        const response = await requester.post('/api/carts').send(mockCart);
        const id = response._body.payload.id;
        const { statusCode, _body } = await requester.get(`/api/carts/${id}/purchase`);
        expect(statusCode).to.be(200);
        expect(typeof _body.message).to.be.eql('ticket created');
    });
});