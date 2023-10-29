import fs from 'fs';

export default class Manager {
    constructor(path) {
        this.path = path;
    };

    get = async () => {
        try {
            if(fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const objects = JSON.parse(data);
                return objects;
            } else {
                return [];
            };
        } catch (error) {
            return error
        };
    };

    add = async (object) => {
        try {
            const objects = await this.get();
            if (objects.length === 0){
                object.id = 1;
            } else {
                object.id = objects.length + 1;
            };
            objects.push(object);
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, '\t'));
            return object;
        } catch (error) {
            return error;
        };
    };
    getByid = async (id) => {
        try {
            const objects = await this.get();
            const objectById = objects.find((object) => object.id === id);
            return objectById;
        } catch (error) {
            return error
        };
    };
    update = async (index, body) => {
        try {
            const objects = await this.get();
            objects[index-1] = {...objects[index-1], ...body};
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, '\t'));
        } catch (error) {
            return error
        };
    };
    delete = async (id) => {
        try {
            const objects = await this.get();
            const index = objects.findIndex((object) => object.id === id)
            if (id >= 0 && id <= objects.length) {
                objects.splice(index, 1);
            };
            await fs.promises.writeFile(this.path, JSON.stringify(objects));
        } catch (error) {
            return error;
        }
    }
};