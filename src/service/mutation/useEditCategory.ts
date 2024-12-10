import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useEditCategory = () => {
    return useMutation({
        mutationFn: (data) => request.put(`api/category_edit/`, data),
    });
};
