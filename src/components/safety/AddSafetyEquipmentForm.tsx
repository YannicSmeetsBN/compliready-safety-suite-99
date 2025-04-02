
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/components/employees/detail/training/trainingUtils";

interface AddSafetyEquipmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  location: string;
  inspectionDate: string;
  expiryDate: string;
};

export const AddSafetyEquipmentForm: React.FC<AddSafetyEquipmentFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      location: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted safety equipment data:", data);
    
    toast({
      title: "Veiligheidsmiddel toegevoegd",
      description: `${data.name} is succesvol toegevoegd aan de locatie ${data.location}.`,
    });
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam veiligheidsmiddel</FormLabel>
              <FormControl>
                <Input placeholder="Bijv. Brandblusser, AED..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locatie</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een locatie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="magazijn">Magazijn</SelectItem>
                  <SelectItem value="kantoor">Kantoor</SelectItem>
                  <SelectItem value="receptie">Receptie</SelectItem>
                  <SelectItem value="werkplaats">Werkplaats</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspectionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keuringsdatum</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vervaldatum</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuleren
          </Button>
          <Button type="submit" className="bg-compliblue hover:bg-compliblue/90">
            Veiligheidsmiddel toevoegen
          </Button>
        </div>
      </form>
    </Form>
  );
};
