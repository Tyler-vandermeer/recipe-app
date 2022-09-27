import { Storage, Drivers } from '@ionic/storage';

export interface Recipe {
    id: number,
    name: string;
    description?: string,
    ingredients: Ingredient[];
    instructions: Instruction[];
}

export interface Ingredient {
    id: number,
    name: string,
    amount: string
}

export interface Instruction {
    step: number,
    description: string
}

let storage: any;

export const createStore = async (name = "__mydb") => {
    storage = new Storage({
        name,
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });

    storage.create();
}

export const set = (key: string, value: Recipe[]) => {
    // Add logic to check if recipe name exists and to generate an index
    storage.set(key, value);
}

export const get = async (key: string) => {
    const val = await storage.get(`${key}`);
    return val;
}