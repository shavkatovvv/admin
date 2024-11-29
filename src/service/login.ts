import { useMutation } from "@tanstack/react-query";
import { request } from "../config/request";

export interface ILogin {
    phone_number: string;
    password: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: ILogin) => request.post("/api/admin-login/", data),
    });
};
