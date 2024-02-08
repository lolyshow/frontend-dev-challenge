import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";
import { CreateNewVoyagePayload } from "~/types/voyage";
import { fetchData } from "~/utils";
import type { ReturnType } from "../pages/api/voyage/getAll";
import { queryClient } from "~/queryClient";

export const useVoyage = () => {
  const { toast } = useToast();

  const getVoyages = useQuery<ReturnType>({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
  });

  const createVoyage = useMutation({
    mutationFn: async (payload: CreateNewVoyagePayload) => {
      const response = await fetch(`/api/voyage/create`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
      getVoyages.refetch()
      toast({
        description: "Voyage Created Successfully",
      });
    },
  });

  return {
    createVoyage,
    getVoyages,
  };
};
