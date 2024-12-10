import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateBrand = () => {
    return useMutation({
        mutationFn: (formData: FormData) =>
            request.post(`/brand/`, formData).then((res) => res.data),
    });
};
