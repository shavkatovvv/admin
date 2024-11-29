import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface Create {
    img: File;
    name: string;
    change: string;
}

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: (data: Create) => request.post("/api/admin/", data),
    });
};
