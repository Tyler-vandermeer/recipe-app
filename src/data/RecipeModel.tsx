import { Storage, Drivers } from '@ionic/storage';

export interface IRecipe {
    id: number,
    name: string;
    description?: string,
    ingredients: IIngredient[];
    instructions: IInstruction[];
}

export interface IIngredient {
    name: string,
    amount: string
}

export interface IInstruction {
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

export const set = (key: string, value: IRecipe[]) => {
    // Add logic to check if recipe name exists and to generate an index
    storage.set(key, value);
}

export const get = async (key: string) => {
    const val = await storage.get(`${key}`);
    return val;
}