import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface BrandType {
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

export const useGetBrand = () => {
    return useQuery<BrandType>({
        queryKey: ["Brand"],
        queryFn: () => request.get("/brand/").then((res) => res.data),
    });
};
