import MongoSingleton from "./singleton.js";

const firstInstance = MongoSingleton.getInstance();
const secondInstance = MongoSingleton.getInstance();
const thirdInstance = MongoSingleton.getInstance();