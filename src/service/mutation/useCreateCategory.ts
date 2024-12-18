import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/category/", data),
    });
};
