import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/async-storage";

export interface AuthState {
    isLogged: boolean;
    status: AuthStatus;
    token: string | null;
    user: User | null;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<boolean>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    isLogged: false,
    token: null,
    user: null,

    login: async (email: string, password: string) => {

        const resp = await authLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated' })
            return false
        }

        // save token in storage
        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', isLogged: true, token: resp.token, user: resp.user })

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated' })
            return false;
        }
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', isLogged: true, token: resp.token, user: resp.user })
        return true;
    },

    logout: async () => {
        await StorageAdapter.clear();
        set({ status: 'unauthenticated', isLogged: false, token: null, user: null })
    }

}))