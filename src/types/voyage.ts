import { UnitType, Vessel } from "@prisma/client";

export interface CreateNewVoyagePayload {
  departure: string;
  arrival: string;
  portOfLoading: string;
  portOfDischarge: string;
  vessel: string;
  unitTypes: string[];
}

export interface VoyageResponse {
  departure: string;
  arrival: string;
  portOfLoading: string;
  portOfDischarge: string;
  vessel: Vessel[];
  unitTypes: UnitType[];
}

export interface CreateNewVoyageModal {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DetailsModalProps {
  triggerElement: React.ReactNode;
  unitTypes: UnitType[];
}
