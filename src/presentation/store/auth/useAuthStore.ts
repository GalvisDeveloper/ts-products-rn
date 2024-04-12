import { Alert } from "react-native";
import { create } from "zustand";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/async-storage";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interfaces/auth/auth.status";

export interface AuthState {
    isLogged: boolean;
    status: AuthStatus;
    token: string | null;
    user: User | null;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
    checkStatus: () => Promise<boolean>;
    saveTokenAndUpdateUser: (token: string, user: User) => Promise<void>;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    isLogged: false,
    token: null,
    user: null,

    saveTokenAndUpdateUser: async (token: string, user: User) => {
        await StorageAdapter.setItem('token', token);
        set({ status: 'authenticated', isLogged: true, token: token, user: user });
    },

    login: async (email: string, password: string) => {

        const resp = await authLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated' })
            return false
        }

        // save token in storage
        await get().saveTokenAndUpdateUser(resp.token, resp.user);
        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated' })
            return false;
        }
        await get().saveTokenAndUpdateUser(resp.token, resp.user);
        return true;
    },

    logout: async () => {
        await StorageAdapter.clear();
        set({ status: 'unauthenticated', isLogged: false, token: null, user: null })
    },

    signUp: async (email: string, password: string, fullName: string) => {
        const resp = await authRegister(email, password, fullName);
        if (!resp) {
            set({ status: 'unauthenticated' })
            return false;
        }
        Alert.alert('Success', 'User created successfully');
        await get().saveTokenAndUpdateUser(resp.token, resp.user);
        return true;
    }

}))