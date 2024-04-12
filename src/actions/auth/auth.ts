import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import { showErrorMessage } from "../../helpers/axiosError";
import { AuthResponse } from "../../infraestructure/interfaces/auth/auth.responses";

const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles
    }

    return { user, token: data.token }
}

export const authLogin = async (email: string, password: string) => {
    try {
        email = email.toLocaleLowerCase();
        const { data } = await tesloApi.post<AuthResponse>("/auth/login", { email, password });

        return returnUserToken(data);
    } catch (error) {
        showErrorMessage(error);
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");

        return returnUserToken(data);
    } catch (error) {
        console.log({ error })
    }
}

export const authRegister = async (email: string, password: string, fullName: string) => {
    try {
        email = email.toLocaleLowerCase();
        const { data } = await tesloApi.post<AuthResponse>("/auth/register", { email, password, fullName });

        return returnUserToken(data);
    } catch (error) {
        showErrorMessage(error);
    }
}