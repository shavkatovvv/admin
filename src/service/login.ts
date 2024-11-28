import { useMutation } from "@tanstack/react-query";
import { request } from "../config/request";

export interface ILogin {
    phone: string;
    password: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: ILogin) => request.post("/", data),
    });
};
