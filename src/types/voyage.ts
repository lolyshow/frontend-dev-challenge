export interface CreateNewVoyagePayload {
  departure: string;
  arrival: string;
  portOfLoading: string;
  portOfDischarge: string;
  vessel: string;
  unitTypes: string[];
}
