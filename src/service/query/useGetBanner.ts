import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface BannerType {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        created_at: string;
        updated_at: string;
        image: string;
        title: string;
        description: string;
    }[];
}

export const useGetBanner = () => {
    return useQuery<BannerType>({
        queryKey: ["Banner"],
        queryFn: () => request.get("/banner/").then((res) => res.data),
    });
};
