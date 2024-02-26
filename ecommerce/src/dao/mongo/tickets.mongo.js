import ticketsModel from './models/tickets.model.js';

export default class Tickets {
    constructor() {};

    save = async (ticket) => {
        const result = await ticketsModel.create(ticket);
        return result;
    };
};