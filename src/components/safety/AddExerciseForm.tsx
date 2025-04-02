
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
import { useToast } from "@/hooks/use-toast";

interface AddExerciseFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = {
  type: string;
  date: string;
  location: string;
  participants: number;
  description: string;
  notes: string;
};

export const AddExerciseForm: React.FC<AddExerciseFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      type: "",
      date: new Date().toISOString().split("T")[0],
      location: "",
      participants: 0,
      description: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted exercise data:", data);
    
    toast({
      title: "Oefening geregistreerd",
      description: `De ${data.type} is succesvol ingepland voor ${data.date}.`,
    });
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type oefening</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een type oefening" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BHV Oefening">BHV Oefening</SelectItem>
                  <SelectItem value="Ontruimingsoefening">Ontruimingsoefening</SelectItem>
                  <SelectItem value="Brandoefening">Brandoefening</SelectItem>
                  <SelectItem value="EHBO Oefening">EHBO Oefening</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="Hoofdkantoor">Hoofdkantoor</SelectItem>
                  <SelectItem value="Magazijn">Magazijn</SelectItem>
                  <SelectItem value="Productiehal">Productiehal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aantal deelnemers</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
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
              <FormLabel>Omschrijving</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Geef een omschrijving van de oefening..." 
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opmerkingen</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Eventuele opmerkingen..." 
                  className="min-h-[80px]"
                  {...field} 
                />
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
            Oefening registreren
          </Button>
        </div>
      </form>
    </Form>
  );
};
