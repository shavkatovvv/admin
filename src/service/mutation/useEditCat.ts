import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

interface CategoryEdit {
    id: string;
    data: FormData;
}

export const useEditCategory = () => {
    return useMutation({
        mutationFn: ({ id, data }: CategoryEdit) =>
            request.put(`/category/${id}/`, data),
    });
};
