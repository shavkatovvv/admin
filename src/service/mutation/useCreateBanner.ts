import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateBanner = () => {
    return useMutation({
        mutationFn: (formData: FormData) =>
            request.post(`/banner/`, formData).then((res) => res.data),
    });
};
