import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateSubCategory = () => {
    return useMutation({
        mutationFn: (formData: FormData) =>
            request.post(`/category/`, formData),
    });
};
