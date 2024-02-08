import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/utils";
import { SelectType } from "~/types/selectype";

 type UseUnitTypePayload = {
    fetch?: boolean
}

export const useUnitType = ({ fetch }: UseUnitTypePayload) => {

    const { data: unitTypes } = useQuery<SelectType[]>({
        queryKey: ["unitTypes"],
        enabled:fetch,
        queryFn: () => fetchData("unitType/getAll"),
      })
      
    return {
        unitTypes
    }
}

