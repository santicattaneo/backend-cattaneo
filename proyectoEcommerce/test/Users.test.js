import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080/');

describe('Pruebas de integracion modulo de users', () => {
    it('POST de /api/users/register. Debe registrar a un nuevo usuario', async () => {
        const { statusCode, _body } = await requester.post('/api/users/register')
        expect(statusCode).to.be.eql(200);
        expect(_body.message).to.be.eql('user registered');
    });
    it('POST de /api/users/login. Debe setear la session', async () => {
        const { statusCode, request} = await requester.post('/api/users/register')
        expect(statusCode).to.be.eql(200);
        expect(request.session.user).to.exist;
    });
    it('GET de /api/users/logout. Debe eliminar la session', async () => {
        const { statusCode, request} = await requester.post('/api/users/register')
        expect(statusCode).to.be.eql(200);
        expect(request.session.user).to.not.exist;
    });
});