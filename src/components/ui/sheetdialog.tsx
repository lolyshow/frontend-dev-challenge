import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";

import { Label } from "./label";
import { Input } from "./input";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateNewVoyageModal, CreateNewVoyagePayload } from "~/types/voyage";
import { MultiSelect } from "./multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VouyageFormSchema } from "~/schemas/voyageformschema";
import { useVessel } from "~/hooks/useVessel";
import { useUnitType } from "~/hooks/useUnitType";
import { useVoyage } from "~/hooks/useVoyage";
import { SelectType } from "~/types/selectype";
import { ComboboxDemo } from "./select";

type CreateVoyageFormField = z.infer<typeof VouyageFormSchema>;

export const SheetDialog = ({ isOpen, onOpenChange }: CreateNewVoyageModal) => {
  const { unitTypes } = useUnitType({ fetch: true });
  const { vesselFormatted } = useVessel({ fetch: true });
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<SelectType[]>([]);
  const { createVoyage } = useVoyage();
  const [unitTypeError, setUnitTypeError] = useState<string>("");
  const [vesselError, setVesselError] = useState<string>("");
  const [isFormReset, setIsFormReset] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState<SelectType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<CreateNewVoyagePayload>({
    defaultValues: {
      vessel: "",
    },
    resolver: zodResolver(VouyageFormSchema),
  });

  const convertToAPIDateFormat = (inputValue: string) => {
    const date = new Date(inputValue);

    const formattedDate = date.toISOString();

    return formattedDate;
  };

  const handleSelectedVessel = (selectedVessel: SelectType) => {
    setVesselError("");
    setSelectedVessel(selectedVessel);
    setValue("vessel", selectedVessel?.id);
  };
  const handleSelectedUnitType = (selectedUnit: SelectType[]) => {
    setUnitTypeError("");
    setSelectedUnitTypes(selectedUnit);
  };

  const onSubmit: SubmitHandler<CreateVoyageFormField> = (formData) => {
    const arrivalDateValue = getValues("arrival");
    const departureDateValue = getValues("departure");
    const arrival = convertToAPIDateFormat(arrivalDateValue);
    const departure = convertToAPIDateFormat(departureDateValue);
    const vessel = getValues("vessel");
    if (selectedUnitTypes?.length < 2) {
      setUnitTypeError("Please Select 2 or more Unit Types");
    } else if (vessel === "") {
      setVesselError("Please Select a Vessel");
    } else {
      setIsFormReset(false);
      const unitTypes = selectedUnitTypes.map((unitType) => unitType.id);
      const payload = { ...formData, arrival, departure, vessel, unitTypes };
      createVoyage.mutate(payload);
    }
  };

  useEffect(() => {
    if (createVoyage.isSuccess && isFormReset === false) {
      reset();
      setSelectedUnitTypes([]);
      setSelectedVessel(undefined);
      setIsFormReset(true);
    }
  }, [createVoyage]);
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Create Voyage</SheetTitle>
            <SheetDescription>
              Please Provide the voyage information below
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className=" flex flex-col gap-2">
              <Label htmlFor="departure" className="">
                Departure Date
              </Label>
              <Input
                type="datetime-local"
                id="departure"
                {...register("departure")}
                className="col-span-3"
              />
              {errors?.departure && (
                <p className="col-span-3 text-red-500">
                  {errors?.departure?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="">
                Arrival Date
              </Label>
              <Input
                type="datetime-local"
                id="arrival"
                {...register("arrival")}
                className="col-span-3"
              />
              {errors?.arrival && (
                <p className="col-span-3 text-red-500">
                  {errors?.arrival?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="">
                Port Of Loading
              </Label>
              <Input
                id="portOfLoading"
                {...register("portOfLoading")}
                className="col-span-3"
              />
              {errors?.portOfLoading && (
                <p className="col-span-3 text-red-500">
                  {errors?.portOfLoading?.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col gap-2 ">
              <Label htmlFor="portOfDischarge" className="">
                Port Of Discharge
              </Label>
              <Input
                id="portOfDischarge"
                {...register("portOfDischarge")}
                className="col-span-3"
              />
              {errors?.portOfDischarge && (
                <p className="col-span-3 text-red-500">
                  {errors?.portOfDischarge?.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col ">
              <Label htmlFor="portOfDischarge" className="py-2">
                Vessel
              </Label>
              
                <ComboboxDemo
                  options={vesselFormatted}
                  setSelected={handleSelectedVessel}
                  selected={selectedVessel}
                />
              

              {vesselError !== "" && (
                <p className="col-span-3 text-red-500">{vesselError}</p>
              )}
            </div>
            <div className=" flex flex-col gap-2 ">
              <Label htmlFor="portOfDischarge" className="py-2">
                Unit Type
              </Label>
              {unitTypes && (
                <MultiSelect
                  options={unitTypes}
                  selected={selectedUnitTypes}
                  setSelected={handleSelectedUnitType}
                />
              )}
              {unitTypeError !== "" && (
                <p className="col-span-3 text-red-500">{unitTypeError}</p>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button
              type="submit"
              disabled={createVoyage.isPending}
              className="mt-2"
            >
              {createVoyage.isPending ? "Sending..." : "Create Voyage"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
