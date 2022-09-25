import { Storage, Drivers } from '@ionic/storage';

let storage: any;

export const createStore = async (name = "__mydb") => {
    storage = new Storage({
        name,
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });

    storage.create();
}

export const set = (key: string, value: any) => {
    // Add logic to check if recipe name exists and to generate an index
    storage.set(key, value);
}

export const get = async (key: string) => {
    const val = await storage.get(`${key}`);
    return val;
}