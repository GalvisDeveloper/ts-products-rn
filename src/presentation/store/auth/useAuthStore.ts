import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authLogin } from "../../../actions/auth/auth";

export interface AuthState {
    isLogged: boolean;
    status: AuthStatus;
    token: string | null;
    user: User | null;

    login: (email: string, password: string) => Promise<boolean>;
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

        // TODO: save token in storage

        set({ status: 'authenticated', isLogged: true, token: resp.token, user: resp.user })

        return true;
    }

}))