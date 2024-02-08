import React, { useEffect } from "react";
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
import { FancyMultiSelect } from "./multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VouyageFormSchema } from "~/schemas/voyageformschema";
import { useVessel } from "~/hooks/useVessel";
import { useUnitType } from "~/hooks/useUnitType";
import { useVoyage } from "~/hooks/useVoyage";
import { SelectType } from "~/types/selectype";
import { ComboboxDemo } from "./select";
import { toast } from "./use-toast";
import { ToastAction } from "@radix-ui/react-toast";
type CreateVoyageFormField = z.infer<typeof VouyageFormSchema>;
export const SheetDialog = ({ isOpen, onOpenChange }: CreateNewVoyageModal) => {
  const { unitTypes } = useUnitType({ fetch: true });
  const { vesselFormatted } = useVessel({ fetch: true });
  const { getVoyages } = useVoyage();
  const [selectedUnitTypes, setSelectedUnitTypes] = React.useState<
    SelectType[]
  >([]);
  const { createVoyage } = useVoyage();
  const [selectedVessel, setSelectedVessel] = React.useState<SelectType>({
    id: "",
    name: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<CreateNewVoyagePayload>({
    defaultValues: {
      departure: "",
      arrival: "",
    },
    resolver: zodResolver(VouyageFormSchema),
  });

  const convertToAPIDateFormat = (inputValue: string) => {
    const date = new Date(inputValue);

    const formattedDate = date.toISOString();

    return formattedDate;
  };

  const handleSelectedVessel = (selectedVessel: SelectType) => {
    setSelectedVessel(selectedVessel);
    setValue("vessel", selectedVessel?.id);
  };
  const handleSelectedUnitType = (selectedUnit: SelectType[]) => {
    // setValue("unitTypes",selectedUnit)
    setSelectedUnitTypes(selectedUnit);
  };

  const onSubmit: SubmitHandler<CreateVoyageFormField> = (formData) => {
    const arrivalDateValue = getValues("arrival");
    const departureDateValue = getValues("departure");
    const arrival = convertToAPIDateFormat(arrivalDateValue);
    const departure = convertToAPIDateFormat(departureDateValue);
    const vessel = getValues("vessel");

    const unitTypes = selectedUnitTypes.map((unitType) => unitType.id);
    const payload = { ...formData, arrival, departure, vessel, unitTypes };
    // console.log("FormDataDAta",)
    createVoyage.mutate(payload);
  };

  useEffect(() => {
    if (createVoyage?.isSuccess) {
      reset();
      toast({
        description: "Voyage Created Successfully",
      });
    } else if (createVoyage.isError || createVoyage.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Voyage request.",
      });
    }
  }, []);
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
            </div>
            <div className=" flex flex-col gap-2 ">
              <Label htmlFor="portOfDischarge" className="py-2">
                Unit Type
              </Label>
              {unitTypes && (
                <FancyMultiSelect
                  options={unitTypes}
                  selected={selectedUnitTypes}
                  setSelected={handleSelectedUnitType}
                />
              )}
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={createVoyage.isPending} className="mt-2">
              {createVoyage.isPending?"Sending...":"Create Voyage"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
