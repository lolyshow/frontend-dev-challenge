import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/utils";
import { useMemo } from "react";
import { SelectType } from "~/types/selectype";
import { VesselResponseType } from "~/types/vesselresponsetype";

type UseVessel = {
  fetch?: boolean;
};

export const useVessel = ({ fetch }: UseVessel) => {
  const { data: vessels } = useQuery<VesselResponseType[]>({
    queryKey: ["vessels"],
    enabled: fetch,
    queryFn: () => fetchData("vessel/getAll"),
  });
  const vesselFormatted = useMemo(() => {
    return vessels?.map((vessel) => ({
      id: vessel.value,
      name: vessel.label,
    })) as SelectType[];
  }, [vessels]);
  return {
    vessels,
    vesselFormatted,
  };
};
