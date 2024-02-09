import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";
import { CreateNewVoyagePayload } from "~/types/voyage";
import { fetchData } from "~/utils";
import { ReturnType } from "../pages/api/voyage/getAll";
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
        throw new Error("Failed to create voyage");
      }
    },
  
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
      await getVoyages.refetch();
      toast({
        style: { background: "green", borderColor: "green" },
        variant: "destructive",
        title: "Success!!!",
        description: "Voyage Created Successfully!!!",
      });
    },
  
    onError() {
      toast({
        variant: "destructive",
        title: "Error!!",
        description: "There was an error Creating Voyage!!!",
      });
    },
  });
  

  return {
    createVoyage,
    getVoyages,
  };
};




