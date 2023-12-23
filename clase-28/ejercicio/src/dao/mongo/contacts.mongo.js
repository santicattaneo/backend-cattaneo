import contactsModel from './models/contacts.model.js';

export default class Contacts {
    constructor(){};

    get = async () => {
        return await contactsModel.find();
    };
    
    create = async (contact) => {
        return await contactsModel.create(contact);
    };

    modify = async(id, contact) => {
        return await contactsModel.findByIdAndUpdate(id, contact);
    };

    delete = async (id) => {
        return await contactsModel.findByIdAndDelete(id);
    };
};