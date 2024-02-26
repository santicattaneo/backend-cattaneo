import { expect } from 'chai';
import sinon from 'sinon';
import * as UsersService from '../../src/services/users.service.js';

describe('Users service', () => {
    it('Deberia retornar un usuario por email', async () => {
        const email = 'test@test.com';
        
        //mockear el llamado al metodo getByEmail de nuestro repository
        const stubUser = {
            first_name: 'Coder mock',
            last_name: 'House mock',
            email: 'ch@coder.com',
            password: 'FJ94785HYG2498H',
            role: 'admin'
        }
        const stub = sinon.stub(UsersService.usersRepository, 'getByEmail').returns(stubUser); 

        const result = await UsersService.getByEmail(email);
        expect(stub.calledOnce).to.be.true;

        stub.restore();
    });
    it('Deberia retornar una excepción por usuario no encontrado', async () => {
        const stub = sinon.stub(UsersService.usersRepository, 'getByEmail').returns(null);

        await UsersService.getByEmail('test@test.com').catch((error) => {
            expect(error.message).to.be.eql('user not found');
        });

        stub.restore();
    });
});