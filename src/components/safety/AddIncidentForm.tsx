
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddIncidentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = {
  date: string;
  time: string;
  location: string;
  employees: string;
  description: string;
  actionTaken: boolean;
  actionDescription?: string;
};

export const AddIncidentForm: React.FC<AddIncidentFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      location: "",
      employees: "",
      description: "",
      actionTaken: false,
      actionDescription: "",
    },
  });

  const actionTaken = form.watch("actionTaken");

  const onSubmit = (data: FormValues) => {
    console.log("Submitted incident data:", data);
    console.log("Uploaded file:", file);
    
    toast({
      title: "Incident gemeld",
      description: "Het incident is succesvol geregistreerd in het systeem.",
    });
    
    onSuccess();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Datum</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tijdstip</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  <SelectItem value="werkplaats">Werkplaats</SelectItem>
                  <SelectItem value="laboratorium">Laboratorium</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betrokken medewerkers</FormLabel>
              <FormControl>
                <Input placeholder="Namen van betrokken medewerkers" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschrijving incident</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Geef een gedetailleerde beschrijving van het incident..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Bijlage toevoegen</FormLabel>
          <div className="border border-dashed border-gray-300 rounded-md p-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-gray-400" />
              <p className="text-sm text-gray-500">
                Klik om een bestand te selecteren of sleep het hier naartoe
              </p>
              <Input
                type="file"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm font-medium text-gray-700 mt-2">
                  {file.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="actionTaken"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Actie ondernomen</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {actionTaken && (
          <FormField
            control={form.control}
            name="actionDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actie beschrijving</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Beschrijf welke actie er ondernomen is..." 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuleren
          </Button>
          <Button type="submit" className="bg-compliblue hover:bg-compliblue/90">
            Incident melden
          </Button>
        </div>
      </form>
    </Form>
  );
};
