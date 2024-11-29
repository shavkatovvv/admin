import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => request.get("/api/admin/").then((res) => res.data),
    });
};
