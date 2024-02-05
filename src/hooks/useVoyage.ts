import { useMutation } from "@tanstack/react-query";
import { CreateNewVoyagePayload } from "~/types/voyage";

export const useVoyage = () => {

    const createVoyage = useMutation({
        mutationFn: async (payload: CreateNewVoyagePayload) => {
          const response = await fetch(`/api/voyage/create`, {
            method: "POST",
            body: JSON.stringify(payload)
          });
    
          if (!response.ok) {
            throw new Error("Failed to delete the voyage");
          }
        },
           onSuccess: async () => {
            
        },
        }
      );

      return {
        createVoyage
      }
}