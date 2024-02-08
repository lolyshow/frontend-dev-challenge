import { UnitType } from "@prisma/client";
import React from "react";

export interface CreateNewVoyagePayload {
  departure: string;
  arrival: string;
  portOfLoading: string;
  portOfDischarge: string;
  vessel: string;
  unitTypes: string[];
}

export interface CreateNewVoyageModal {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
