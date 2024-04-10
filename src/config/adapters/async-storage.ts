import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";

export class StorageAdapter {

    static async getItem(key: string): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async setItem(key: string, value: string): Promise<void> {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (e) {
            throw new Error(`Error setting item ${key}. ` + e);
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (e) {
            throw new Error(`Error removing item ${key}. ` + e);
        }
    }

    static async clear(): Promise<void> {
        try {
            return await AsyncStorage.clear();
        } catch (e) {
            throw new Error(`Error clearing storage. ` + e);
        }
    }

    static async getAllKeys(): Promise<readonly string[]> {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (e) {
            throw new Error(`Error getting all keys. ` + e);
        }
    }

    static async multiGet(keys: string[]): Promise<readonly KeyValuePair[]> {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (e) {
            throw new Error(`Error getting multiple keys. ` + e);
        }
    }

    static async multiSet(keyValuePairs: [string, string][]): Promise<void> {
        try {
            return await AsyncStorage.multiSet(keyValuePairs);
        } catch (e) {
            throw new Error(`Error setting multiple keys. ` + e);
        }
    }

    static async multiRemove(keys: string[]): Promise<void> {
        try {
            return await AsyncStorage.multiRemove(keys);
        } catch (e) {
            throw new Error(`Error removing multiple keys. ` + e);
        }
    }

    static async multiMerge(keyValuePairs: [string, string][]): Promise<void> {
        try {
            return await AsyncStorage.multiMerge(keyValuePairs);
        } catch (e) {
            throw new Error(`Error merging multiple keys. ` + e);
        }
    }

    static async mergeItem(key: string, value: string): Promise<void> {
        try {
            return await AsyncStorage.mergeItem(key, value);
        } catch (e) {
            throw new Error(`Error merging item ${key}. ` + e);
        }
    }

}