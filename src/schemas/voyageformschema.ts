import { z } from 'zod';



export const VouyageFormSchema = z.object({

  portOfLoading: z.string().min(1),
  portOfDischarge: z.string().min(1),
  // vessel: z.string().min(4),
  departure: z.string(),
  arrival: z.string().refine((value) => {
    const departureDate = new Date(value);
    const currentDate = new Date();
    return departureDate > currentDate; // Arrival date should be in the future
  }, { message: 'Arrival date must be in the future' }),
})
.refine(data => {
  return new Date(data.arrival) > new Date(data.departure);
}, { message: 'Arrival date must be greater than departure date' });