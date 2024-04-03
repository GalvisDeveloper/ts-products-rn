import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import { AuthResponse } from "../../infraestructure/interfaces/auth.responses";

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

        console.log(data)
        return returnUserToken(data);
    } catch (error) {
        console.error(error)
    }
}