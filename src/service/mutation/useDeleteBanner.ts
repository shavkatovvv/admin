import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDeleteBanner = () => {
    return useMutation({
        mutationFn: (id: string) => request.delete(`/banner/${id}/`),
    });
};
