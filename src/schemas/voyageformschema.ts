import { z } from "zod";

export const VouyageFormSchema = z
  .object({
    portOfLoading: z.string().min(1),
    portOfDischarge: z.string().min(1),
    departure: z.string().min(16,{message: "Please Select Departure Date and time"}).max(16),
    arrival: z.string().min(16,{message: "Please Select Arrival Date and time"}).max(16),
  })
  .refine(
    (data) => {
      return data.arrival > data.departure;
    },
    {
      message: "Departure date and time should be before arrival date and time",
      path: ["departure"],
    },
  );
