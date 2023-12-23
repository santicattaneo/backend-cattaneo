import BusinessRepository from '../repositories/business.repository.js';

const businessRepository = BusinessRepository();

const getBusiness = async () => {
    const result = await businessRepository.getBusiness();
    return result;
};

const getBusinessById = async (id) => {
    const result = await businessRepository.getBusinessById(id);
    return result;
};

const createBusiness = async (business) => {
    const result = await businessRepository.createBusiness(business);
    return result;
}

export {
    getBusiness,
    getBusinessById,
    createBusiness
};