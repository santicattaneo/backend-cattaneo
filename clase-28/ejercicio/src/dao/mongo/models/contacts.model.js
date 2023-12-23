import mongoose from 'mongoose';

const contactsCollection = 'contacs';

const contactsSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const contactsModel = mongoose.model(contactsCollection, contactsSchema);

export default contactsModel;