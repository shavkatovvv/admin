import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface CategoryType {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        title: string;
        image: string;
        parent: number;
    }[];
}

export const useGetCategory = () => {
    return useQuery<CategoryType>({
        queryKey: ["category"],
        queryFn: () => request.get("/category/").then((res) => res.data),
    });
};
