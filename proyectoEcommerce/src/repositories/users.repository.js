export default class UsersRepository {
    constructor (dao) {
        this.dao = dao;
    };

    getByEmail = async (email) => {
        const user = await this.dao.getByEmail(email);
        return user;
    };

    getById = async (cid) => {
        const user = await this.dao.getById(cid);
        return user;
    };
    
    save = async (user) => {
        const result = await this.dao.save(user);
        return result;
    };
    
};