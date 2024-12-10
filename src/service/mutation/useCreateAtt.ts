import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface AttrValue {
    category: number;
    title: string;
    values: string[];
}

export const useCreateAtt = () => {
    return useMutation({
        mutationFn: (data: AttrValue | any) =>
            request.post("/attribute/", data).then((res) => res.data),
    });
};
